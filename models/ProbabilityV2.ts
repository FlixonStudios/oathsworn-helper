import { Permutation } from "js-combinatorics";

export class ProbabilityV2 {
  public getAllPermutations(inputArr: string[]) {
    const permutations = new Permutation(inputArr);
    return [...permutations];
  }
}
