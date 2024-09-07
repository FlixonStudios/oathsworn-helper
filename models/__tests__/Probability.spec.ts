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
    it.each([
      [1, 0, [new Card(1)]],
      [0.5, 1, [new Card(1), new Card()]],
      [0, 1, [new Card()]],
      [0.75, 1, [new Card(1), new Card(1), new Card(1), new Card()]],
    ])("target value of 1 draw 1", (prob, target, mockCards) => {
      const deck = new MightDeck(mockCards);
      const probability = new Probability(new DeckManager({ "0": deck }));
      const result = probability.skillCheck({ target, iterations: 5000 });
      expect(isWithin(result["1"].p_target, prob, 0.02)).toEqual(true);
    });

    it.each([
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
      const deck = new MightDeck(mockCards);
      const probability = new Probability(new DeckManager({ "0": deck }));
      const result = probability.skillCheck({ target, iterations: 5000 });

      expect(isWithin(result["2"].p_target, prob, 0.02)).toEqual(true);
    });
    it.each([[0.5, 4, [new Card(2, true), new Card()]]])(
      "target value of 4 ",
      (prob, target, mockCards) => {
        const deck = new MightDeck(mockCards);
        const probability = new Probability(new DeckManager({ "0": deck }));
        const result = probability.skillCheck({ target, iterations: 5000 });

        expect(isWithin(result["3"].p_target, prob, 0.02)).toEqual(true);
      }
    );
  });
  describe("damageAdvice", () => {
    it.each([
      [
        0,
        {},
        [
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 0, "2": 0, "3": 0 },
            missChance: 0,
            averageDamage: 4,
          },
        ],
      ],
      [
        1,
        {},
        [
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 1, "2": 0, "3": 0 },
            missChance: 0,
            averageDamage: 5,
          },
        ],
      ],
      [
        2,
        {},
        [
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 2, "2": 0, "3": 0 },
            missChance: 0,
            averageDamage: 6,
          },
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 0, "2": 1, "3": 0 },
            missChance: 0,
            averageDamage: 7,
          },
        ],
      ],
      [
        3,
        {},
        [
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 3, "2": 0, "3": 0 },
            missChance: 0,
            averageDamage: 7,
          },
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 1, "2": 1, "3": 0 },
            missChance: 0,
            averageDamage: 8,
          },
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 0, "2": 0, "3": 1 },
            missChance: 0,
            averageDamage: 10,
          },
        ],
      ],
    ])(
      "should return the expected advice",
      (numOfExtraEmpower, baseMight, expected) => {
        const deckManager = new DeckManager({
          "0": new MightDeck([new Card(1)]),
          "1": new MightDeck([new Card(2)]),
          "2": new MightDeck([new Card(4)]),
          "3": new MightDeck([new Card(7)]),
        });
        const probability = new Probability(deckManager);
        const results = probability.damageAdvice({
          iterations: 100,
          baseMight: baseMight,
          numOfExtraEmpower,
        });
        expect(results).toEqual(expected);
      }
    );
    it.each([
      [
        0,
        {},
        [
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 0, "2": 0, "3": 0 },
            missChance: 0,
            averageDamage: 4,
          },
        ],
      ],
      [
        1,
        {},
        [
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 1, "2": 0, "3": 0 },
            missChance: 0,
            averageDamage: 5,
          },
        ],
      ],
      [
        2,
        {},
        [
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 2, "2": 0, "3": 0 },
            missChance: 0,
            averageDamage: 6,
          },
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 0, "2": 1, "3": 0 },
            missChance: 0,
            averageDamage: 7,
          },
        ],
      ],
      [
        3,
        {},
        [
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 3, "2": 0, "3": 0 },
            missChance: 0,
            averageDamage: 7,
          },
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 1, "2": 1, "3": 0 },
            missChance: 0,
            averageDamage: 8,
          },
          {
            cardsDrawnPerIteration: 4,
            combination: { "1": 0, "2": 0, "3": 1 },
            missChance: 0,
            averageDamage: 10,
          },
        ],
      ],
    ])(
      "should return the expected advice",
      (numOfExtraEmpower, baseMight, expected) => {
        const deckManager = new DeckManager({
          "0": new MightDeck([new Card(1)]),
          "1": new MightDeck([new Card(2)]),
          "2": new MightDeck([new Card(4)]),
          "3": new MightDeck([new Card(7)]),
        });
        const probability = new Probability(deckManager);
        const results = probability.damageAdvice({
          iterations: 100,
          baseMight: baseMight,
          numOfExtraEmpower,
        });
        expect(results).toEqual(expected);
      }
    );
  });
});
