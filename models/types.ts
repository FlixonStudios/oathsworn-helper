import { Card } from "./Card";
import { Damage } from "./Damage";
import { Deck } from "./Deck";
import { MightDeck } from "./MightDeck";
import { Optimizable } from "./Optimizer";

export interface DrawSession {
  totalDamage: number;
  noOfCardsDrawn: number;
  isMiss?: boolean;
  isInfinite: boolean;
  critCount: number;
  damageValues: Damage[];
  cardsDrawn: Card[];
}

export interface MightDecks extends Decks<MightDeck> {
  "0": MightDeck;
  "1"?: MightDeck;
  "2"?: MightDeck;
  "3"?: MightDeck;
}

export interface Empower extends Decks<number> {
  "1"?: number;
  "2"?: number;
  "3"?: number;
}

export interface Decks<T> {
  "0"?: T;
  "1"?: T;
  "2"?: T;
  "3"?: T;
}

export interface SkillCheckResult {
  p_target: number;
  cardsToDraw: number;
}

export interface DamageAdvicePerEmpowerCombi extends Optimizable {
  empCombi: Empower;
}

export interface DamageAdvicePerEmpowerCombiResults {
  cardsToDraw: number;
  combination: Empower;
  missChance: number;
  averageDamage: number;
}

export interface Recommendations {
  [key: string]: SkillCheckResult;
}

export interface DeckAndToDraw {
  deck: Deck;
  toDraw?: number;
}

export type SkillCheckScenario = DeckAndToDraw[];
