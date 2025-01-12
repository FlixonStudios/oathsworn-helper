import { ProbabilityV2 } from "../ProbabilityV2";

describe("ProbabilityV2", () => {
  it("should return all possible combinations given the cards", () => {
    const mockCards = ["0", "1", "2"];

    const p = new ProbabilityV2();
    const result = p.getAllPermutations(mockCards);
    const expected = [
      ["0", "1", "2"],
      ["0", "2", "1"],
      ["1", "0", "2"],
      ["1", "2", "0"],
      ["2", "0", "1"],
      ["2", "1", "0"],
    ];

    expect(result).toEqual(expected);
  });
});
