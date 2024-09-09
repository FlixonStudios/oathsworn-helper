import { NUM_OF_CARDS } from "@/constants/model";
import { DeckManager } from "./DecksManager";
import {
  DamageAdvicePerEmpowerCombi,
  DamageAdvicePerEmpowerCombiResults,
  DrawSession,
  Empower,
} from "./types";
import { NumberHelper } from "./NumberHelper";
import { Iterator } from "./Iterator";
import { Optimizable, Optimizer } from "./Optimizer";

interface DamageAdviceOptions extends Optimizable {
  numOfExtraEmpower: number;
  baseMight: Empower;
}

interface SkillCheckOptions extends Optimizable {
  target: number;
  baseMight: Empower;
}

const DEFAULT_DAMAGE_ADVICE_OPTIONS: DamageAdviceOptions = {
  numOfExtraEmpower: 0,
  baseMight: {},
  iterations: 100,
  targetedScenarios: NUM_OF_CARDS,
};

const DEFAULT_SKILL_CHECK_OPTIONS: SkillCheckOptions = {
  target: 0,
  baseMight: {},
  iterations: 100,
  targetedScenarios: NUM_OF_CARDS,
};

const DEFAULT_DAMAGE_ADVICE_PER_EMPOWER_COMBI: DamageAdvicePerEmpowerCombi = {
  empCombi: {},
  targetedScenarios: NUM_OF_CARDS,
  iterations: 100,
};

export class Probability {
  constructor(
    public deckManager: DeckManager,
    public numberHelper = new NumberHelper()
  ) {}
  public damageAdvice(
    _options: Partial<DamageAdviceOptions> = DEFAULT_DAMAGE_ADVICE_OPTIONS
  ) {
    const options: DamageAdviceOptions = {
      ...DEFAULT_DAMAGE_ADVICE_OPTIONS,
      ..._options,
    };
    const { baseMight, numOfExtraEmpower, iterations, targetedScenarios } =
      options;

    const empowerCombinations = this.numberHelper.getEmpowerCombinations(
      baseMight,
      numOfExtraEmpower
    );

    const optimizer = new Optimizer();

    return empowerCombinations.map((empCombi) => {
      return optimizer.optimizeResults(
        {
          top: 4,
          initialTargetedScenarios: targetedScenarios,
          keyForValue: "averageDamage",
          keyForScenario: "cardsToDraw",
          finalIteration: iterations,
        },
        ({ iterations, targetedScenarios }) =>
          this.damageAdviceForEmpowerCombi({
            iterations,
            targetedScenarios,
            empCombi,
          })
      );
    });
  }

  public damageAdviceForEmpowerCombi(
    _options: Partial<DamageAdvicePerEmpowerCombi>
  ): DamageAdvicePerEmpowerCombiResults[] {
    const options = { ...DEFAULT_DAMAGE_ADVICE_PER_EMPOWER_COMBI, ..._options };
    const { empCombi, iterations, targetedScenarios } = options;

    let calculation = {
      totalDamage: 0,
      missed: 0,
    };
    const calculate = (results: DrawSession) => {
      calculation.totalDamage += results.totalDamage;
      if (results.isMiss) calculation.missed++;
    };

    return targetedScenarios.map((cardsToDraw) => {
      calculation.totalDamage = 0;
      calculation.missed = 0;
      this.justDraw(cardsToDraw, empCombi, calculate, iterations);
      return {
        cardsToDraw: cardsToDraw,
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
    const iterator = new Iterator(this.deckManager, empower);
    iterator.iterateFor(
      {
        calculate,
        toDraw: cardsToDraw,
      },
      iterations
    );
  }
  public skillCheck(_options: Partial<SkillCheckOptions>) {
    const options = { ...DEFAULT_SKILL_CHECK_OPTIONS, ..._options };
    const { target, baseMight, iterations, targetedScenarios } = options;
    return targetedScenarios.map((cardsToDraw) =>
      this.drawTill(target, cardsToDraw, iterations, baseMight)
    );
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
      cardsToDraw,
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
