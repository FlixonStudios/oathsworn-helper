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
});
