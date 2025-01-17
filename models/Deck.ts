// import { nanoid } from "nanoid";
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
    public drawnCards: Card[] = [] // public id: string = nanoid(10)
  ) {
    this.remainingCards = [...this.template];
  }

  public shuffleAllTogether() {
    this.drawnCards = [];
    const toBeShuffled = [...this.template];
    this.shufflePile(toBeShuffled, this.remainingCards);
    return this;
  }

  public shuffleAllTogetherWithSomeInDrawn(cardsToNotReshuffle: Card[]) {
    this.drawnCards = [];
    const toBeShuffled = [...this.template];

    cardsToNotReshuffle.forEach((card) => {
      toBeShuffled.splice(
        this.getCardIndexFromName(card.name, toBeShuffled),
        1
      );
    });
    this.shufflePile(toBeShuffled, this.remainingCards);
    this.drawnCards = [...cardsToNotReshuffle];
    return this;
  }

  public shuffleRemaining() {
    const toBeShuffled = [...this.remainingCards];
    this.shufflePile(toBeShuffled, this.remainingCards);
    return this;
  }

  /**
   * @param toBeShuffledPile must be a copied array
   * @param receivingPile will be mutated
   */
  public shufflePile(toBeShuffledPile: Card[], receivingPile: Card[]) {
    //TODO: see how to remove elements without removing array
    do {
      receivingPile.pop();
    } while (receivingPile.length > 0);

    for (let i = toBeShuffledPile.length; i > 0; i--) {
      const index = this.getRandomCardIndex(toBeShuffledPile);
      receivingPile.push(...toBeShuffledPile.splice(index, 1));
    }
  }

  public _draw(cardsToNotReshuffle?: Card[]) {
    if (this.template.length === 0) {
      return;
    }

    if (this.remainingCards.length === 0 && cardsToNotReshuffle) {
      this.shuffleAllTogetherWithSomeInDrawn(cardsToNotReshuffle);
    }

    if (this.remainingCards.length === 0 && !cardsToNotReshuffle) {
      this.shuffleAllTogether();
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
    return this.transfer(name, this.remainingCards, this.drawnCards);
  }

  public revert(name: string) {
    return this.transfer(name, this.drawnCards, this.remainingCards);
  }

  public getDeckCardCount(): DeckCardCount {
    return {
      remaining: this.getCountOfCards(this.remainingCards),
      drawn: this.getCountOfCards(this.drawnCards),
    };
  }

  private transfer(name: string, startPile: Card[], endPile: Card[]) {
    const index = this.getCardIndexFromName(name, startPile);
    if (index < 0) return;
    const card = startPile.splice(index, 1)[0];
    endPile.push(card);
    return card;
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

  private getCardIndexFromName(
    name: string,
    pile: Card[] = this.remainingCards
  ) {
    return pile.findIndex((card) => card.name === name);
  }

  private getRandomCardIndex(cards: Card[]) {
    const index = Math.floor(Math.random() * cards.length);
    return index === cards.length ? index - 1 : index;
  }
}
