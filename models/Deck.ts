import { Card } from "./Card";

export class Deck {
  constructor(
    public template: Card[] = [],
    public remainingCards: Card[] = [],
    public drawnCards: Card[] = []
  ) {
    this.remainingCards = [...this.template];
  }
  public shuffle() {
    this.drawnCards = [];
    const toBeShuffled = [...this.template];

    for (let i = toBeShuffled.length; i > 0; i--) {
      const index = this.getRandomCardIndex(toBeShuffled);
      this.remainingCards.push(...toBeShuffled.splice(index, 1));
    }
  }
  public draw() {
    const card = this.remainingCards.splice(0, 1)[0];
    this.drawnCards.push(card);
    return card;
  }
  private getRandomCardIndex(cards: Card[]) {
    const index = Math.floor(Math.random() * cards.length);
    return index === cards.length ? index - 1 : index;
  }
}
