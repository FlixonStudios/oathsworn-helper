interface Args {
  iterations: number;
  targetedScenarios?: number[];
  [key: string]: any;
}

export type IterFunc = (args: Args) => any[];

export interface OptimizerOptions {
  top: number;
  keyForValue: string;
  keyForScenario: string;
}

export class Optimizer {
  public optimizeResults(
    top: number,
    keyForValue: string,
    keyForScenario: string,
    iterFunc: IterFunc
  ) {
    const iterationArr = [100, 500, 2500];
    const splicer = [9, 7, top];

    let significantResults = [];
    let targetedScenarios;
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
