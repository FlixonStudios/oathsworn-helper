import { NUM_OF_CARDS } from "@/constants/model";
import { DeckManager } from "./DecksManager";
import { Empower, Recommendations } from "./types";
import { NumberHelper } from "./NumberHelper";

export class Probability {
  constructor(
    public numberHelper = new NumberHelper()
  ) {}
    _deckManager: DeckManager,
    target: number,
    empower: Empower = {},
    includeMiss = true
  ) {
    const ITERATIONS = 30000;
    const recommendations: Recommendations = {};
    const deckManager = _deckManager.clone();

    for (let i = 0; i < NUM_OF_CARDS.length; i++) {
      recommendations[NUM_OF_CARDS[i].toString()] = this.drawTill(
        deckManager,
        target,
        NUM_OF_CARDS[i],
        ITERATIONS,
        empower
      );
    }

    return recommendations;
  }

  public drawTill(
    _deckManager: DeckManager,
    target: number,
    cardsToDraw: number,
    iterations: number,
    empower: Empower,
    includeMiss = true
  ) {
    let calculation = {
      miss: 0,
      success: 0,
    };
    let summary = {
      p_target: 0,
    };

    for (let i = 0; i < iterations; i++) {
      const deckManager = _deckManager.clone().shuffleDecks();
      const results = deckManager.startDraw(cardsToDraw, empower);
      if (results.totalDamage >= target) {
        calculation.success++;
      }
      if (results.isMiss) {
        calculation.miss++;
      }
    }

    summary.p_target =
      Math.round((calculation.success / iterations) * 10000) / 10000;

    return summary;
  }
}
