import { Optimizer } from "../Optimizer";

interface MockInterface {
  iterations: number;
  targetedScenarios?: number[];
  other?: number;
}

const mockIterFunc = ({
  iterations,
  targetedScenarios = [8, 1, 6, 4, 0, 9, 5, 7, 3, 2],
  other,
}: MockInterface) => {
  for (let i = 0; i < iterations; i++) {
    // do something [0,1,2,3,4,5,6,7,8,9]
  }
  return targetedScenarios.map((val) => {
    return {
      p_val: val,
      cardsToDraw: val,
    };
  });
};

describe("Optimizer", () => {
  describe("optimizeResults", () => {
    it("should return top x values", () => {
      const optimizer = new Optimizer();
      const results = optimizer.optimizeResults(
        {
          top: 4,
          keyForValue: "p_val",
          keyForScenario: "cardsToDraw",
          initialTargetedScenarios: [8, 1, 6, 4, 0, 9, 5, 7, 3, 2],
        },
        mockIterFunc
      );
      const expected = [9, 8, 7, 6].map((val) => ({
        p_val: val,
        cardsToDraw: val,
      }));
      expect(results).toEqual(expected);
    });
  });
});
