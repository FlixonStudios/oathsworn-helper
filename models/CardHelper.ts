import { Card } from "./Card";

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
    const shouldAppendReshuffled = this.shouldAppendReshuffled(
      remainingSet,
      targetNoOfCards
    );
    return {
      confirmed: shouldAppendReshuffled ? remainingSet : [],
      toPermutate: shouldAppendReshuffled ? drawnSet : remainingSet,
    };
  }

  public shouldAppendReshuffled(
    remainingCards: string[],
    targetNoOfCards: number
  ) {
    // not everything in drawn should be added
    // Case 1: remainingCards (set) >= maxPossible -> no need append
    // Case 2: remainingCards (set) < maxPossible -> need to append but only generate perm for appended
    const maxPossible =
      targetNoOfCards === 0
        ? 0
        : targetNoOfCards + this.getNoOfCritsInCards(remainingCards);
    return remainingCards.length < maxPossible;
  }

  private getCardNameSetFromDeck(cards: Card[]) {
    return cards.map((card) => card.name);
  }

  private getNoOfCritsInCards(cardNames: string[]) {
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
