import { NUM_OF_CARDS } from "@/constants/model";
import { DeckManager } from "./DecksManager";
import { DrawSession, Empower, Recommendations } from "./types";
import { NumberHelper } from "./NumberHelper";
import { Iterator } from "./Iterator";

interface DamageAdviceOptions {
  numOfExtraEmpower: number;
  baseMight: Empower;
  iterations: number;
}

interface SkillCheckOptions {
  target: number;
  empower: Empower; 
  iterations: number;
}

const DEFAULT_DAMAGE_ADVICE_OPTIONS: DamageAdviceOptions = {
  numOfExtraEmpower: 0,
  baseMight: {},
  iterations: 100,
};

const DEFAULT_SKILL_CHECK_OPTIONS: SkillCheckOptions = {
  target: 0,
  empower: {},
  iterations: 100,
}

export class Probability {
  constructor(
    public deckManager: DeckManager,
    public numberHelper = new NumberHelper()
  ) {}
  // given an empower value and current deck state
  // what is the recommended card combination
  // and number of cards to draw for max avg damage
  public damageAdvice(
    _options: Partial<DamageAdviceOptions> = DEFAULT_DAMAGE_ADVICE_OPTIONS
  ) {
    const options: DamageAdviceOptions = {
      ...DEFAULT_DAMAGE_ADVICE_OPTIONS,
      ..._options,
    };
    const { baseMight, numOfExtraEmpower, iterations } = options;
    const empowerCombinations = this.numberHelper.getEmpowerCombinations(
      baseMight,
      numOfExtraEmpower
    );
    let calculation = {
      totalDamage: 0,
      missed: 0,
    };

    const calculate = (results: DrawSession) => {
      calculation.totalDamage += results.totalDamage;
      if (results.isMiss) calculation.missed++;
    };
    // FIXME: make dynamic
    const cardsToDraw = 4;

    return empowerCombinations.map((empCombi) => {
      calculation.totalDamage = 0;
      calculation.missed = 0;
      this.justDraw(cardsToDraw, empCombi, calculate, iterations);
      return {
        cardsDrawnPerIteration: cardsToDraw,
        combination: empCombi,
        missChance: calculation.missed / iterations,
        averageDamage: calculation.totalDamage / iterations,
      };
    });
  }

  public justDraw(
    cardsToDraw: number,
    empower: Empower,
    calculate: (results: DrawSession) => void,
    iterations: number
  ) {
    const deckManager = this.deckManager.clone();
    deckManager.shuffleDecks();
    deckManager.startDraw(cardsToDraw);
    const iterator = new Iterator(deckManager, empower);
    iterator.iterateFor(
      {
        calculate,
        toDraw: cardsToDraw,
      },
      iterations
    );
  }

  // given a target number to hit the returns probability to succeed per number
  public skillCheck(_options: Partial<SkillCheckOptions>) {
    const options = { ...DEFAULT_SKILL_CHECK_OPTIONS, ..._options }
    const { target, empower, iterations } = options

    const recommendations: Recommendations = {};

    for (let i = 0; i < NUM_OF_CARDS.length; i++) {
      recommendations[NUM_OF_CARDS[i].toString()] = this.drawTill(
        target,
        NUM_OF_CARDS[i],
        iterations,
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
