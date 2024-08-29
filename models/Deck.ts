import { Card } from "./Card";

export interface CardCount {
  [key: string]: number;
}
export interface DeckCardCount {
  remaining: CardCount;
  drawn: CardCount;
}

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
    if (this.template.length === 0) {
      return;
    }
    if (this.remainingCards.length === 0) {
      this.shuffle();
    }

    const card = this.remainingCards.splice(0, 1)[0];
    this.drawnCards.push(card);
    return card;
  }
  public getUniqueCardList() {
    const uniqueCardList: string[] = [];
    this.template.forEach((card) => {
      if (!uniqueCardList.includes(card.name)) {
        uniqueCardList.push(card.name);
      }
    });
    return uniqueCardList;
  }
  public seek(name: string) {
    const index = this.getCardIndexFromName(name);
    if (index < 0) return;
    const card = this.remainingCards.splice(index, 1)[0];
    this.drawnCards.push(card);
    return card;
  }
  public getDeckCardCount(): DeckCardCount {
    return {
      remaining: this.getCountOfCards(this.remainingCards),
      drawn: this.getCountOfCards(this.drawnCards),
    };
  }
  private getCountOfCards(cards: Card[]) {
    const count: CardCount = {};
    for (let i = 0; i < cards.length; i++) {
      const cardName = cards[i].name;
      if (!count[cardName]) {
        count[cardName] = 1;
      } else {
        count[cardName]++;
      }
    }
    return count;
  }
  private getCardIndexFromName(name: string) {
    return this.remainingCards.findIndex((card) => card.name === name);
  }
  private getRandomCardIndex(cards: Card[]) {
    const index = Math.floor(Math.random() * cards.length);
    return index === cards.length ? index - 1 : index;
  }
}
