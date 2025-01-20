import { Card } from "../Card";
import { CardHelper } from "../CardHelper";

describe("CardHelper", () => {
  describe("addSet", () => {
    it("should add x no. of cards to template", () => {
      const cardHelper = new CardHelper();
      cardHelper.addSet(new Card(1), 3).addSet(new Card(), 3);
      expect(cardHelper.template).toStrictEqual([
        new Card(1),
        new Card(1),
        new Card(1),
        new Card(),
        new Card(),
        new Card(),
      ]);
    });
  });
  describe("createDeckTemplate", () => {
    it("should return template", () => {
      const cardHelper = new CardHelper();
      cardHelper.addSet(new Card(1), 3);
      expect(cardHelper.createDeckTemplate()).toStrictEqual([
        new Card(1),
        new Card(1),
        new Card(1),
      ]);
    });
    it("should reset the template property", () => {
      const cardHelper = new CardHelper();
      cardHelper.addSet(new Card(1), 3).createDeckTemplate();
      expect(cardHelper.template).toStrictEqual([]);
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
        const cardHelper = new CardHelper();
        const result = cardHelper.sliceTillAfterCrit(targetNoOfCards, mockSet);
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
        const cardHelper = new CardHelper();

        const result = cardHelper.getCurrentCardSet(
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
        const cardHelper = new CardHelper();

        const result = cardHelper.getConfirmedCardSet(target, drawn, remaining);

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
        const cardHelper = new CardHelper();

        const result = cardHelper.getToPermutateCardSet(target, drawn, remaining);

        expect(result).toEqual(expected);
      }
    );
  });
});
