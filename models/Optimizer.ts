export interface Optimizable {
  iterations: number;
  targetedScenarios: number[];
  [key: string]: any;
}

export type IterFunc<T> = (args: Optimizable) => T[];

export interface OptimizerOptions {
  initialTargetedScenarios: number[];
  keyForValue: string;
  keyForScenario: string;
  top?: number;
  finalIteration?: number;
  iterationArr?: number[];
  filterArr?: number[];
}

const DEFAULT_OPTIMIZER_OPTIONS = {
  top: 4,
  finalIteration: 3000,
  iterationArr: [100, 500, 2500],
  filterArr: [9, 7],
};

export class Optimizer {
  public optimizeResults<T>(_options: OptimizerOptions, iterFunc: IterFunc<T>) {
    const options = { ...DEFAULT_OPTIMIZER_OPTIONS, ..._options };
    const {
      top,
      keyForValue,
      keyForScenario,
      initialTargetedScenarios,
      filterArr,
      finalIteration,
      iterationArr,
    } = options;

    const splicer = [...filterArr, top];

    let significantResults = [] as any[];
    let targetedScenarios = initialTargetedScenarios;
    for (let i = 0; i < iterationArr.length; i++) {
      const results = iterFunc({
        iterations: iterationArr[i],
        targetedScenarios,
      });
      significantResults = results.sort(
        (valA: any, valB: any) => valB[keyForValue] - valA[keyForValue]
      );
      significantResults = significantResults.slice(0, splicer[i]);
      targetedScenarios = significantResults.map((val) => val[keyForScenario]);
    }

    const shortlistedScenarios = significantResults.map(
      (val) => val[keyForScenario]
    );

    return iterFunc({
      iterations: finalIteration,
      targetedScenarios: shortlistedScenarios,
    }).sort((valA: any, valB: any) => valB[keyForValue] - valA[keyForValue]);
  }
}
