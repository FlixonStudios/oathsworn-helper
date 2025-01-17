import { Card } from "../Card";
import { Damage } from "../Damage";
import { DeckManager } from "../DecksManager";
import { Iterator } from "../Iterator";
import { MightDeck } from "../MightDeck";
import { DrawSession } from "../types";

describe("Iterator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("iterate", () => {
    it("should return correct Draw Session", () => {
      const deckManager = new DeckManager({
        "0": new MightDeck([new Card(1), new Card(1), new Card(1)]),
      });
      const iterator = new Iterator(deckManager, {});
      const result = iterator.iterate(3);

      const expected: DrawSession = {
        isMiss: false,
        noOfCardsDrawn: 3,
        totalDamage: 3,
        isInfinite: false,
        critCount: 0,
        damageValues: [new Damage(1), new Damage(1), new Damage(1)],
        cardsDrawn: [],
      };
      expect(result).toEqual(expected);
    });
    it("should return correct Draw Session over multiple draws", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0);
      const deckManager = new DeckManager({
        "0": new MightDeck([
          new Card(1),
          new Card(1),
          new Card(1),
          new Card(),
        ]),
      });
      const iterator = new Iterator(deckManager, {});
      const results = [iterator.iterate(3), iterator.iterate(3)];

      const expected: DrawSession = {
        isMiss: false,
        noOfCardsDrawn: 3,
        totalDamage: 3,
        isInfinite: false,
        critCount: 0,
        damageValues: [new Damage(1), new Damage(1), new Damage(1)],
        cardsDrawn: [],
      };
      expect(results).toEqual([expected, expected]);
    });
  });
});
