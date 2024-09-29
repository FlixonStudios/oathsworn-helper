import { Empower } from "./types";

export class NumberHelper {
  public getEmpowerCombinations(_empower: Empower = {}, extraEmpower: number) {
    const empower = { ..._empower };
    return this.convertToEmpower(empower, this.getCountOfValue(extraEmpower));
  }

  public convertToEmpower(empower: Empower, combinations: number[][]) {
    return combinations.map((combi): Empower => {
      const emp = [
        empower[1] ? empower[1] : 0,
        empower[2] ? empower[2] : 0,
        empower[3] ? empower[3] : 0,
      ];
      return {
        "1": combi[0] + emp[0],
        "2": combi[1] + emp[1],
        "3": combi[2] + emp[2],
      };
    });
  }
  /* 
        if x = 1
        [1,0,0]
        if x = 2 
        [2,0,0], [0,1,0]
        if x = 3
        [3,0,0], [1,1,0], [0,0,1]
        if x = 4
        [4,0,0], [2,1,0], [0,2,0], [1,0,1]
        if x = 5
        [5,0,0], [3,1,0], [1,2,0], [2,0,1], [0,1,1]
        if x = 6
        [6,0,0], [4,1,0], [2,2,0], [0,3,0], [3,0,1], [1,1,1], [0,0,2]
    */
  public getCountOfValue(num: number) {
    const allPossible: number[][] = this.getValues(num);
    const filtered = this.getEqualToNum(allPossible, num);
    return filtered;
  }

  private getEqualToNum(
    allPossible: number[][],
    num: number,
    valArr = [1, 2, 3],
    maxCards = 10
  ) {
    return allPossible
      .filter(this.getCasesWithinMax.bind(this))
      .filter((val) => this.sumOfVal(val, valArr) === num);
  }

  private getCasesWithinMax(values: number[], max = 10) {
    const noOfCards = values.reduce((pV, cV) => (pV += cV), 0);
    return noOfCards <= max;
  }

  private getValues(num: number) {
    const val = [1, 2, 3];
    const max = val.map((val) => Math.floor(num / val));
    const allPossible: number[][] = [];
    // Explore how to recursively get values
    for (let k = 0; k <= max[2]; k++) {
      for (let j = 0; j <= max[1]; j++) {
        for (let i = 0; i <= max[0]; i++) {
          allPossible.push([i, j, k]);
        }
      }
    }

    return allPossible;
  }

  private sumOfVal(countArr: number[], valArr: number[]) {
    return countArr
      .map((val, i) => valArr[i] * val)
      .reduce((pV, cV) => (pV += cV));
  }
  public __testExports__ = {
    getValues: this.getValues.bind(this),
    getCasesWithinMax: this.getCasesWithinMax.bind(this),
  };
}
