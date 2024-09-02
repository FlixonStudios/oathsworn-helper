import { Card } from "../Card";
import { DeckManager } from "../DecksManager";
import { MightDeck } from "../MightDeck";
import { Probability } from "../Probability";

const isWithin = (actual: number, predicted: number, precision: number) => {
  return actual >= predicted - precision && actual <= predicted + precision;
};

describe("Probability", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  describe("skillCheck", () => {
    xit.each([
      [1, 0, [new Card(1)]],
      [0.5, 1, [new Card(1), new Card()]],
      [0, 1, [new Card()]],
      [0.75, 1, [new Card(1), new Card(1), new Card(1), new Card()]],
    ])("target value of 1 draw 1", (prob, target, mockCards) => {
      const probability = new Probability();
      const deck = new MightDeck(mockCards);
      const result = probability.skillCheck(new DeckManager({"0": deck}), target);
      expect(isWithin(result["1"].p_target, prob, 0.01)).toEqual(true);
    });

    xit.each([
      [1, 2, [new Card(1)]],
      [0.33, 2, [new Card(1), new Card(1), new Card()]],
      [0.66, 2, [new Card(2, true), new Card(), new Card()]],
      [
        0.66,
        2,
        [
          new Card(2, true),
          new Card(2),
          new Card(1),
          new Card(1),
          new Card(),
          new Card(),
        ],
      ],
    ])("target value of 2 ", (prob, target, mockCards) => {
      const probability = new Probability();
      const deck = new MightDeck(mockCards);
      const result = probability.skillCheck(new DeckManager({"0": deck}), target);

      expect(isWithin(result["2"].p_target, prob, 0.02)).toEqual(true);
    });
    xit.each([[0.5, 4, [new Card(2, true), new Card()]]])(
      "target value of 4 ",
      (prob, target, mockCards) => {
        const probability = new Probability();
        const deck = new MightDeck(mockCards);
        const result = probability.skillCheck(new DeckManager({"0": deck}), target);

        expect(isWithin(result["3"].p_target, prob, 0.02)).toEqual(true);
      }
    );
  });
});
