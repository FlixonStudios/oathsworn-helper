import { NumberHelper } from "../NumberHelper";

describe("NumberHelper", () => {
  describe("getCountOfValue", () => {
    it.each([
      [1, [[1, 0, 0]]],
      [
        3,
        [
          [3, 0, 0],
          [1, 1, 0],
          [0, 0, 1],
        ],
      ],
      [
        6,
        [
          [6, 0, 0],
          [4, 1, 0],
          [2, 2, 0],
          [0, 3, 0],
          [3, 0, 1],
          [1, 1, 1],
          [0, 0, 2],
        ],
      ],
    ])("should return a set of empower values", (empowerVal, expected) => {
      const numberHelper = new NumberHelper();
      const result = numberHelper.getCountOfValue(empowerVal);
      expect(result).toEqual(expected);
    });
  });
  describe("getValues", () => {
    it.each([
      [
        1,
        [
          [0, 0, 0],
          [1, 0, 0],
        ],
      ],
      [
        2,
        [
          [0, 0, 0],
          [1, 0, 0],
          [2, 0, 0],
          [0, 1, 0],
          [1, 1, 0],
          [2, 1, 0],
        ],
      ],
      [
        3,
        [
          [0, 0, 0],
          [1, 0, 0],
          [2, 0, 0],
          [3, 0, 0],
          [0, 1, 0],
          [1, 1, 0],
          [2, 1, 0],
          [3, 1, 0],
          [0, 0, 1],
          [1, 0, 1],
          [2, 0, 1],
          [3, 0, 1],
          [0, 1, 1],
          [1, 1, 1],
          [2, 1, 1],
          [3, 1, 1],
        ],
      ],
    ])(
      "should return a set all possible combinations",
      (empowerVal, expected) => {
        const numberHelper = new NumberHelper();
        const result = numberHelper.__testExports__.getValues(empowerVal);
        expect(result).toEqual(expected);
      }
    );
  });
  describe("getCasesWithinMax", () => {
    it.each([
      [[[10, 0, 0]], [[10, 0, 0]]],
      [[[11, 0, 0]], []],
      [[[1, 10, 0]], []],
      [[[0, 1, 10]], []],
      [[[5, 5, 0]], [[5, 5, 0]]],
      [[[1, 1, 8, 1]], []],
      [[[0, 0, 0, 11], [3,3,5], [10]], [[10]]],
    ])(
      "when called as a filter ",
      (valuesArr, expected) => {
        const numberHelper = new NumberHelper();
        const result = valuesArr.filter(
          (values) => numberHelper.__testExports__.getCasesWithinMax(values, 10)
        );
        expect(result).toEqual(expected);
      }
    );
  });
  describe("getEmpowerCombination", () => {
    it("should return an array of Empowers", () => {
      const numberHelper = new NumberHelper();

      const result = numberHelper.getEmpowerCombinations({}, 1);

      const expected = [{ "1": 1, "2": 0, "3": 0 }];
      expect(result).toEqual(expected);
    });
  });
});
