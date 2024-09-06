import { NUM_OF_CARDS } from "@/constants/model";
import { DeckManager } from "./DecksManager";
import { Empower, Recommendations } from "./types";
import { NumberHelper } from "./NumberHelper";
import { Iterator } from "./Iterator";

export class Probability {
  constructor(
    public deckManager: DeckManager,
    public numberHelper = new NumberHelper()
  ) {}
  public damageAdvice(
    _deckManager: DeckManager,
    empower: Empower = {},
    numOfExtraEmpower: number
  ) {
    const deckManager = _deckManager.clone();
    const empowerCombinations = this.numberHelper.getEmpowerCombinations(
      empower,
      numOfExtraEmpower
    );

    const cardsToDraw = 4;
    const empCombi = empowerCombinations[0];
    deckManager.shuffleDecks();
    deckManager.startDraw(cardsToDraw);
  }

  // given a target number to hit the returns probability to succeed per number
  public skillCheck(target: number, empower: Empower = {}, includeMiss = true) {
    const ITERATIONS = 20000;
    const recommendations: Recommendations = {};

    for (let i = 0; i < NUM_OF_CARDS.length; i++) {
      recommendations[NUM_OF_CARDS[i].toString()] = this.drawTill(
        target,
        NUM_OF_CARDS[i],
        ITERATIONS,
        empower
      );
    }

    return recommendations;
  }

  public drawTill(
    target: number,
    cardsToDraw: number,
    iterations: number,
    empower: Empower
  ) {
    let calculation = {
      miss: 0,
      success: 0,
    };
    let summary = {
      p_target: 0,
    };
    const iterator = new Iterator(this.deckManager, empower);
    iterator.iterateFor(
      {
        calculate: (results) => {
          if (results.totalDamage >= target) calculation.success++;
          if (results.isMiss) calculation.miss++;
        },
        toDraw: cardsToDraw,
      },
      iterations
    );

    summary.p_target =
      Math.round((calculation.success / iterations) * 10000) / 10000;

    return summary;
  }
}
