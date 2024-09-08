export interface Optimizable {
  iterations: number;
  targetedScenarios: number[];
  [key: string]: any;
}

export type IterFunc = (args: Optimizable) => any[];

export interface OptimizerOptions {
  top: number;
  keyForValue: string;
  keyForScenario: string;
  initialTargetedScenarios: number[];
}

export class Optimizer {
  public optimizeResults(_options: OptimizerOptions, iterFunc: IterFunc) {
    const { top, keyForValue, keyForScenario, initialTargetedScenarios } =
      _options;

    const iterationArr = [100, 500, 2500];
    const splicer = [9, 7, top];

    let significantResults = [];
    let targetedScenarios = initialTargetedScenarios;
    for (let i = 0; i < iterationArr.length; i++) {
      const results = iterFunc({
        iterations: iterationArr[i],
        targetedScenarios,
      });
      significantResults = results.sort(
        (valA, valB) => valB[keyForValue] - valA[keyForValue]
      );
      significantResults = significantResults.slice(0, splicer[i]);
      targetedScenarios = significantResults.map((val) => val[keyForScenario]);
    }

    return significantResults.map((val) => val[keyForScenario]);
  }
}
