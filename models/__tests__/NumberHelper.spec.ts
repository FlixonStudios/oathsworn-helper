import { Card } from "../Card";
import { DeckManager } from "../DecksManager";
import { MightDeck } from "../MightDeck";
import { NumberHelper } from "../NumberHelper";
import { MightDecks, Empower, AmountToDrawAndCardSets } from "../types";

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
      [[[0, 0, 0, 11], [3, 3, 5], [10]], [[10]]],
    ])("when called as a filter ", (valuesArr, expected) => {
      const numberHelper = new NumberHelper();
      const result = valuesArr.filter((values) =>
        numberHelper.__testExports__.getCasesWithinMax(values, 10)
      );
      expect(result).toEqual(expected);
    });
  });
  describe("getEmpowerCombination", () => {
    it("should return an array of Empowers", () => {
      const numberHelper = new NumberHelper();

      const result = numberHelper.getEmpowerCombinations({}, 1);

      const expected = [{ "1": 1, "2": 0, "3": 0 }];
      expect(result).toEqual(expected);
    });
  });

  describe("sliceTillCrit", () => {
    it.each([
      [1, ["0", "1*"], ["0"]],
      [2, ["0", "1*", "2"], ["0", "1*", "2"]],
      [2, ["0", "1*", "2*"], ["0", "1*", "2*"]],
      [2, ["0", "0", "2*"], ["0", "0"]],
      [1, ["1*", "1*", "2*", "0", "1"], ["1*", "1*", "2*", "0"]],
      [2, ["1*", "1*", "0", "0", "1"], ["1*", "1*", "0", "0"]],
      [2, ["0"], ["0"]],
      [0, ["0"], []],
      [1, [], []],
    ])(
      "should when asked to draw %s and given set is %s - should return %s",
      (targetNoOfCards, mockSet, expected) => {
        const numberHelper = new NumberHelper();
        const result = numberHelper.sliceTillAfterCrit(
          targetNoOfCards,
          mockSet
        );
        expect(result).toEqual(expected);
      }
    );
  });

  describe("getCurrentCardSet", () => {
    it.each([
      [["0", "1*"], ["2", "2"], 1, [], ["0", "1*"]],
      [["0", "1*"], ["2", "2"], 2, ["0", "1*"], ["2", "2"]],
      [["0", "1", "2"], ["3", "3"], 2, [], ["0", "1", "2"]],
      [["0", "1", "2"], ["3", "3"], 4, ["0", "1", "2"], ["3", "3"]],
      [["0*", "1*"], ["2*", "3*"], 2, ["0*", "1*", "2*", "3*"], []],
      [["0*"], ["1", "2"], 0, [], ["0*"]],
    ])(
      "it should decide the set to permutate",
      (
        mockRemaining,
        mockDrawn,
        toDraw,
        expectedConfirmed,
        expectedToPermutate
      ) => {
        const numberHelper = new NumberHelper();

        const result = numberHelper.getCurrentCardSet(
          toDraw,
          mockDrawn,
          mockRemaining
        );

        expect(result.confirmed).toEqual(expectedConfirmed);
        expect(result.toPermutate).toEqual(expectedToPermutate);
      }
    );
  });

  describe("getConfirmedCardSet", () => {
    it.each([
      [2, [], ["0", "1"], ["0", "1"]],
      [1, [], ["0", "1"], []],
      [3, [], ["0", "1", "2*"], ["0", "1", "2*"]],
      [2, [], ["0", "1", "2*"], []],
      [4, [], ["0"], ["0"]], // can't draw what is already being drawn
      [4, ["0", "0"], ["1", "2"], ["1", "2", "0", "0"]],
      [5, ["0", "0"], ["1", "2"], ["1", "2", "0", "0"]],
      [4, ["0", "1", "2"], [], ["0", "1", "2"]],
      [2, ["0", "0", "0"], ["2*", "2*"], ["2*", "2*"]],
      [2, ["2*", "0"], ["1*"], ["1*", "2*", "0"]],
      [3, ["2*", "2*", "0"], ["1*"], ["1*", "2*", "2*", "0"]],
      [3, ["2*", "2*", "0", "0"], ["1*"], ["1*", "2*", "2*", "0", "0"]],
    ])(
      "if drawing %s from %s should return %s",
      (target, drawn, remaining, expected) => {
        const numberHelper = new NumberHelper();

        const result = numberHelper.getConfirmedCardSet(
          target,
          drawn,
          remaining
        );

        expect(result).toEqual(expected);
      }
    );
  });

  describe("getToPermutateCardSet", () => {
    it.each([
      [2, [], ["0", "1"], []],
      [1, [], ["0", "1"], ["0", "1"]],
      [3, [], ["0", "1", "2*"], []],
      [2, [], ["0", "1", "2*"], ["0", "1", "2*"]],
      [4, [], ["0"], []],
      [4, ["0", "0"], ["1", "2"], []],
      [5, ["0", "0"], ["1", "2"], []],
      [4, ["0", "1", "2"], [], []],
      [2, ["0", "0", "0"], ["2*", "2*"], ["0", "0", "0"]],
      [2, ["2*", "0"], ["1*"], []],
      [3, ["2*", "2*", "0"], ["1*"], []],
      [3, ["2*", "2*", "0", "0"], ["1*"], []],
    ])(
      "if drawing %s, with %s drawn, from %s should return %s",
      (target, drawn, remaining, expected) => {
        const numberHelper = new NumberHelper();

        const result = numberHelper.getToPermutateCardSet(
          target,
          drawn,
          remaining
        );

        expect(result).toEqual(expected);
      }
    );
  });
  
  describe("getCardSetsForDecksToProcess", () => {
    it("should return card sets to permutate", () => {
      const decks: MightDecks = {
        "0": new MightDeck(
          [new Card(0), new Card(1)],
          [],
          [new Card(2), new Card(2)]
        ),
        "3": new MightDeck(
          [new Card(3), new Card(3)],
          [],
          [new Card(3), new Card(3)]
        ),
      };
      const empower: Empower = { "0": 1, "3": 3 };
      const deckManager = new DeckManager(decks);
      const numberHelper = new NumberHelper();

      const results = numberHelper.getCardSetsForDecksToProcess(
        deckManager,
        empower
      );

      const expected = [
        {
          cardSets: {
            confirmed: [],
            toPermutate: ["0", "1"],
          },
          numToDraw: 1,
        },
        {
          cardSets: {
            confirmed: ["3", "3"],
            toPermutate: ["3", "3"],
          },
          numToDraw: 3,
        },
      ];

      expect(results).toEqual(expected);
    });
  });

  describe("mergeArrayAndFlatten", () => {
    it("should merge two 1D arrays into another 1D array", () => {
      const numberHelper = new NumberHelper();
      const result = numberHelper.mergeArrayAndFlatten(["1", "2"], ["3", "4"]);

      const expected = ["1,3", "1,4", "2,3", "2,4"];
      expect(result).toEqual(expected);
    });
    it("should merge two 1D arrays into another 1D array", () => {
      const numberHelper = new NumberHelper();
      const result = numberHelper.mergeArrayAndFlatten(
        ["1,2", "2,1"],
        ["3,4", "4,3"]
      );

      const expected = ["1,2,3,4", "1,2,4,3", "2,1,3,4", "2,1,4,3"];
      expect(result).toEqual(expected);
    });
    it("should just copy over the incoming array if incumbent array is ", () => {
      const numberHelper = new NumberHelper();
      const result = numberHelper.mergeArrayAndFlatten(
        [],
        ["1,2", "2,1", "3,4", "4,3"]
      );

      const expected = ["1,2", "2,1", "3,4", "4,3"];
      expect(result).toEqual(expected);
    });
  });

  describe("getFinalPermutationOfCards", () => {
    it.each([
      [
        [
          ["1,2", "2,1"],
          ["3,4", "4,3"],
        ],
        ["1,2,3,4", "1,2,4,3", "2,1,3,4", "2,1,4,3"],
      ],
      [
        [
          ["1,2", "2,1"],
          ["3,4", "4,3"],
          ["5,6", "6,5"],
        ],
        [
          "1,2,3,4,5,6",
          "1,2,3,4,6,5",
          "1,2,4,3,5,6",
          "1,2,4,3,6,5",
          "2,1,3,4,5,6",
          "2,1,3,4,6,5",
          "2,1,4,3,5,6",
          "2,1,4,3,6,5",
        ],
      ],
    ])(
      "should merge and return final permutations",
      (permutatedStringSets, expected) => {
        const numberHelper = new NumberHelper();
        const result =
          numberHelper.getFinalPermutationOfCards(permutatedStringSets);

        expect(result).toEqual(expected);
      }
    );
  });

  // TODO: test for crits
  describe("combineCardSetsForPermutation", () => {
    it.each([
      [
        [
          ["1", "2", "3"],
          ["2", "3", "1"],
          ["3", "1", "2"],
        ],
        [
          {
            cardSets: {
              confirmed: [],
              toPermutate: ["1", "2", "3"],
            },
            numToDraw: 2,
          },
        ],
        [["1,2", "2,3", "3,1"]],
      ],
    ])(
      "should not return permutations ",
      (mockAllPermutations, amountToDrawAndCardSets, expected) => {
        const mockGetAllPermutations = (set: string[]) => mockAllPermutations;

        const numberHelper = new NumberHelper();
        const cardSets: AmountToDrawAndCardSets[] = amountToDrawAndCardSets;
        const result = numberHelper.combineCardSetsForPermutation(
          cardSets,
          mockGetAllPermutations
        );
        expect(result).toEqual(expected);
      }
    );
  });
});
