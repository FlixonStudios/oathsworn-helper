import { MightDeck } from "./MightDeck";

const NUM_OF_CARDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Recommendations {
  [key: string]: { p_target: number };
}

export class Probability {
  public skillCheck(_deck: MightDeck, target: number, includeMiss = true) {
    const ITERATIONS = 50000;
    const recommendations: Recommendations = {};
    for (let i = 0; i < NUM_OF_CARDS.length; i++) {
      recommendations[NUM_OF_CARDS[i].toString()] = this.drawTill(
        _deck,
        target,
        NUM_OF_CARDS[i],
        ITERATIONS
      );
    }
    return recommendations;
  }
  public drawTill(
    _deck: MightDeck,
    target: number,
    cardsToDraw: number,
    iterations: number,
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
      const deck = _deck.clone().shuffle();
      const results = deck.startDraw(cardsToDraw);
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
