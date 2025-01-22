import { Permutation } from "js-combinatorics";

interface ReducerResults {
  value: number;
  success?
  : boolean;
}

export class ProbabilityV2 {
  public getAllPermutations(inputArr: string[]) {
    const permutations = new Permutation(inputArr);
    return [...permutations];
  }
  
  public getAverageValue(
    permutations: string[][],
    reducer: (set: string[]) => ReducerResults
  ) {
    const value = permutations.reduce(
      (total, set) => (total += reducer(set).value),
      0
    );

    return (value / permutations.length).toPrecision(4);
  }

  public getAverageOptimisedValue(
    permutations: string[],
    reducer: (set: string) => ReducerResults
  ) {
    const value = permutations.reduce(
      (total, set) => (total += reducer(set).value),
      0
    );

    return (value / permutations.length).toPrecision(4);
  }
}
