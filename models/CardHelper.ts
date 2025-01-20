import { MISS_CONDITION } from "@/constants/model";
import { Card } from "./Card";
import { MightDeck } from "./MightDeck";

const CRIT_SYMBOL = "*";

export class CardHelper {
  public template: Card[] = [];
  public addSet(card: Card, count: number) {
    for (let i = 0; i < count; i++) {
      this.template.push(card);
    }
    return this;
  }
  public createDeckTemplate() {
    const template = [...this.template];
    this.template = [];
    return template;
  }
  public reset() {
    this.template = [];
    return this;
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
  ) {
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
      return [...remainingSet, ...drawnSet]
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

  private getCardNameSetFromDeck(cards: Card[]) {
    return cards.map((card) => card.name);
  }

  private getNoOfCritsInSet(cardNames: string[]) {
    return cardNames.filter((name) => name.endsWith(CRIT_SYMBOL)).length;
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
}
