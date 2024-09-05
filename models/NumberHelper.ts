export class NumberHelper {
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
    const valArr = [1, 2, 3]; //get length from here
    const allPossible: number[][] = this.getValues(num);
    const filtered = allPossible.filter(
      (val) => this.sumOfVal(val, valArr) === num
    );
    return filtered;
  }

  public getValues(num: number) {
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

  public sumOfVal(countArr: number[], valArr: number[]) {
    return countArr
      .map((val, i) => valArr[i] * val)
      .reduce((pV, cV) => (pV += cV));
  }
}
