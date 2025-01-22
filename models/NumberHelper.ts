import { MISS_CONDITION } from "@/constants/model";
import { Card } from "./Card";
import { DeckManager } from "./DecksManager";
import { MightDeck } from "./MightDeck";
import { ProbabilityV2 } from "./ProbabilityV2";
import {
  AmountToDrawAndCardSets,
  CardSetForPermutation,
  CRIT_SYMBOL,
  Empower,
  EmpowerKeys,
} from "./types";

export class NumberHelper {
  public getEmpowerCombinations(_empower: Empower = {}, extraEmpower: number) {
    const empower = { ..._empower };
    return this.convertToEmpower(empower, this.getCountOfValue(extraEmpower));
  }

  public convertToEmpower(empower: Empower, combinations: number[][]) {
    return combinations.map((combi): Empower => {
      const emp = [
        empower[1] ? empower[1] : 0,
        empower[2] ? empower[2] : 0,
        empower[3] ? empower[3] : 0,
      ];
      return {
        "1": combi[0] + emp[0],
        "2": combi[1] + emp[1],
        "3": combi[2] + emp[2],
      };
    });
  }
  /* 
        if x = 1
        [1,0,0]
        if x = 2 
        [2,0,0], [0,1,0]
        if x = 3
        [3,0,0], [1,1,0], [0,0,1]
        if x = 4
        [4,0,0], [2,1,0], [0,2,0], [1,0,1]
        if x = 5
        [5,0,0], [3,1,0], [1,2,0], [2,0,1], [0,1,1]
        if x = 6
        [6,0,0], [4,1,0], [2,2,0], [0,3,0], [3,0,1], [1,1,1], [0,0,2]
    */
  public getCountOfValue(num: number) {
    const allPossible: number[][] = this.getValues(num);
    const filtered = this.getEqualToNum(allPossible, num);
    return filtered;
  }

  public getProbabilitiesForDecks(deckManager: DeckManager, empower: Empower) {
    const p = new ProbabilityV2();
    const cardsToProcess = this.getCardSetsForDecksToProcess(
      deckManager,
      empower
    );
    const cardSetsToPermutate = this.combineCardSetsForPermutation(
      cardsToProcess,
      p.getAllPermutations
    );
    const permutations = this.getFinalPermutationOfCards(cardSetsToPermutate);

    const average = p.getAverageOptimisedValue(
      permutations,
      (setString: string) => {
        const parsedSet = this.setStringToArray(setString);
        const value = parsedSet.reduce((total, numStr): number => {
          return (total += Number(numStr.replaceAll(CRIT_SYMBOL, "")));
        }, 0);

        return { value };
      }
    );

    return average;
  }

  /**
   * 
   * Converts Decks/Cards to string[] and store noOfCards to draw per deck
   * @returns card sets to permutate
   */
  public getCardSetsForDecksToProcess(
    deckManager: DeckManager,
    empower: Empower
  ) {
    const cardsToDrawAndDeckArr = Object.keys(empower).map((deckIndex) => {
      return {
        numToDraw: empower[deckIndex as EmpowerKeys] ?? 0,
        deck: deckManager.decks[deckIndex as EmpowerKeys],
      };
    });

    const results = cardsToDrawAndDeckArr
      .map(({ numToDraw, deck }) => {
        if (deck && numToDraw > 0) {
          return {
            cardSets: this.getCurrentCardSetFromDeck(numToDraw, deck),
            numToDraw,
          };
        }
      })
      .filter(
        (val): val is { cardSets: CardSetForPermutation; numToDraw: number } =>
          !!val?.cardSets
      );

    return results;
  }

  public getFinalPermutationOfCards(setStringOfDeckArr: string[][]) {
    /**
     * [['1,2','2,1'],['3,4','4,3']]
     * End Goal:
     * [['1,2,3,4','1,2,4,3', '2,1,3,4', '2,1,4,3']]
     * then you flatten one more time.
     */
    const initialSet = [...setStringOfDeckArr];
    let finalPermutation: string[] = [];

    do {
      const arr1 = finalPermutation;
      const arr2 = initialSet.splice(0, 1).flat();

      finalPermutation = this.mergeArrayAndFlatten(arr1, arr2);
    } while (initialSet.length > 0);

    return finalPermutation;
  }

  /**
   * 
   * @param setsToProcess 
   * @param getAllPermutations takes in a combination and returns permutations
   * @returns all drawable set permutations in set string
   */
  public combineCardSetsForPermutation(
    setsToProcess: AmountToDrawAndCardSets[],
    getAllPermutations: (set: string[]) => string[][]
  ) {
    const permutationsPerDeckArr = setsToProcess.map((setToProcess) => {
      // gets possible sets 
      const permutationsWithoutSlice = this.permutateAndCombineConfirmed(
        setToProcess.cardSets,
        getAllPermutations
      );
      // convert the possible permutations to a pratically drawable set string
      return permutationsWithoutSlice.map((permutation) =>
        this.setToString(
          this.sliceTillAfterCrit(setToProcess.numToDraw, permutation)
        )
      );
    });

    return permutationsPerDeckArr;
  }

  public permutateAndCombineConfirmed(
    cardSets: CardSetForPermutation,
    getAllPermutations: (set: string[]) => string[][]
  ) {
    const { confirmed, toPermutate } = cardSets;
    const permutations = getAllPermutations(toPermutate);
    return permutations.map((permutation) => [...confirmed, ...permutation]);
  }

  public getCurrentCardSetFromDeck(targetNoOfCards: number, deck: MightDeck) {
    const remainingSet = this.getCardNameSetFromDeck(deck.remainingCards);
    const drawnSet = this.getCardNameSetFromDeck(deck.drawnCards);

    return this.getCurrentCardSet(targetNoOfCards, drawnSet, remainingSet);
  }

  public getCurrentCardSet(
    targetNoOfCards: number,
    drawnSet: string[],
    remainingSet: string[]
  ): CardSetForPermutation {
    return {
      confirmed: this.getConfirmedCardSet(
        targetNoOfCards,
        drawnSet,
        remainingSet
      ),
      toPermutate: this.getToPermutateCardSet(
        targetNoOfCards,
        drawnSet,
        remainingSet
      ),
    };
  }

  public getConfirmedCardSet(
    targetNoOfCards: number,
    drawnSet: string[],
    remainingSet: string[]
  ) {
    let leftToDraw = targetNoOfCards;

    leftToDraw = leftToDraw - remainingSet.length;

    if (leftToDraw < 0) {
      return [];
    }

    leftToDraw += this.getNoOfCritsInSet(remainingSet);

    if (
      leftToDraw >= drawnSet.length ||
      leftToDraw > drawnSet.length - this.getNoOfCritsInSet(drawnSet)
    ) {
      return [...remainingSet, ...drawnSet];
    }

    return [...remainingSet];
  }

  public getToPermutateCardSet(
    targetNoOfCards: number,
    drawnSet: string[],
    remainingSet: string[]
  ) {
    const toPermutate: string[] = [...remainingSet];
    let leftToDraw = targetNoOfCards;

    leftToDraw = leftToDraw - remainingSet.length;

    if (leftToDraw < 0) {
      return toPermutate;
    }

    leftToDraw += this.getNoOfCritsInSet(remainingSet);

    if (
      leftToDraw >= drawnSet.length ||
      leftToDraw > drawnSet.length - this.getNoOfCritsInSet(drawnSet)
    ) {
      return []; // nothing to generate permutatations for
    }

    return [...drawnSet];
  }

  public mergeArrayAndFlatten(arr1: string[], arr2: string[]) {
    if (arr1.length === 0) {
      return arr2;
    }
    if (arr2.length === 0) {
      return arr1;
    }
    return arr1
      .map((e1) => arr2.map((e2) => this.setToString([e1, e2])))
      .flat();
  }

  public getSuccessCase(set: string[], targetNoOfCards: number) {
    const parsedSet = this.sliceTillAfterCrit(targetNoOfCards, set);

    const value = parsedSet.reduce((total, numStr): number => {
      return (total += Number(numStr.replaceAll(CRIT_SYMBOL, "")));
    }, 0);

    return {
      value,
    };
  }

  public isMiss(set: string[], targetNoOfCards: number) {
    return (
      set
        .slice(0, targetNoOfCards)
        .filter((val) => val === MISS_CONDITION.valueCausingMiss.toString())
        .length >= MISS_CONDITION.timesValueAppeared
    );
  }

  // used after permutations are generated
  public sliceTillAfterCrit(targetNoOfCards: number, set: string[]) {
    if (set.length === 0) return [];

    let end = targetNoOfCards;

    for (let i = 0; i < end; i++) {
      if (set[i].endsWith(CRIT_SYMBOL)) {
        end++;
      }
      if (end > set.length - 1) {
        break;
      }
    }
    return set.slice(0, end);
  }

  private setToString(set: string[]) {
    return set.toString();
  }

  private setStringToArray(setString: string) {
    return setString.split(",");
  }

  private getCardNameSetFromDeck(cards: Card[]) {
    return cards.map((card) => card.name);
  }

  private getNoOfCritsInSet(cardNames: string[]) {
    return cardNames.filter((name) => name.endsWith(CRIT_SYMBOL)).length;
  }

  private getEqualToNum(
    allPossible: number[][],
    num: number,
    valArr = [1, 2, 3],
    maxCards = 10
  ) {
    return allPossible
      .filter((val) => this.getCasesWithinMax(val, maxCards))
      .filter((val) => this.sumOfVal(val, valArr) === num);
  }

  private getCasesWithinMax(values: number[], max = 10) {
    const noOfCards = values.reduce((pV, cV) => (pV += cV), 0);
    return noOfCards <= max;
  }

  private getValues(num: number) {
    const val = [1, 2, 3];
    const max = val.map((val) => Math.floor(num / val));
    const allPossible: number[][] = [];
    // Explore how to recursively get values
    for (let k = 0; k <= max[2]; k++) {
      for (let j = 0; j <= max[1]; j++) {
        for (let i = 0; i <= max[0]; i++) {
          allPossible.push([i, j, k]);
        }
      }
    }

    return allPossible;
  }

  private sumOfVal(countArr: number[], valArr: number[]) {
    return countArr
      .map((val, i) => valArr[i] * val)
      .reduce((pV, cV) => (pV += cV));
  }
  public __testExports__ = {
    getValues: this.getValues.bind(this),
    getCasesWithinMax: this.getCasesWithinMax.bind(this),
  };
}
