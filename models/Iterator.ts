import { DeckManager } from "./DecksManager";
import { DrawSession, Empower } from "./types";

interface IterateForOptions {
  calculate: (result: DrawSession) => void;
  toDraw: number;
}

export class Iterator {
  public deckManager: DeckManager;
  constructor(deckManager: DeckManager, empower?: Empower) {
    this.deckManager = deckManager.clone()
    this.deckManager.empower = empower;
  }

  public iterate(numToDraw: number) {
    const newDeckManager = this.deckManager.clone().shuffleDecks();
    return newDeckManager.shuffleDecks().startDraw(numToDraw);
  }

  public iterateFor(options: IterateForOptions, iterations: number) {
    const { calculate, toDraw } = options;
    for (let i = 0; i < iterations; i++) {
      calculate(this.iterate(toDraw));
    }
  }
}
