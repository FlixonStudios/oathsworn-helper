import { Card } from "@/models/Card";
import { CardHelper } from "@/models/CardHelper";
import { Deck } from "@/models/Deck";

const cardHelper = new CardHelper();
export const whiteCardsTemplate = cardHelper
  .addSet(new Card(), 6)
  .addSet(new Card(1), 6)
  .addSet(new Card(2), 3)
  .addSet(new Card(2, true), 3)
  .createDeckTemplate();
export const yellowCardsTemplate = cardHelper
  .addSet(new Card(), 6)
  .addSet(new Card(1), 3)
  .addSet(new Card(2), 3)
  .addSet(new Card(3), 3)
  .addSet(new Card(3, true), 3)
  .createDeckTemplate();
export const redCardsTemplate = cardHelper
  .addSet(new Card(), 6)
  .addSet(new Card(2), 3)
  .addSet(new Card(3), 6)
  .addSet(new Card(4, true), 3)
  .createDeckTemplate();
export const blackCardsTemplate = cardHelper
  .addSet(new Card(), 6)
  .addSet(new Card(3), 6)
  .addSet(new Card(4), 3)
  .addSet(new Card(5, true), 3)
  .createDeckTemplate();

export const whiteDeck = new Deck(whiteCardsTemplate);
export const yellowDeck = new Deck(yellowCardsTemplate);
export const redDeck = new Deck(redCardsTemplate);
export const blackDeck = new Deck(blackCardsTemplate);