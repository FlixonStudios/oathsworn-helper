import { Card } from "../Card";
import { DecksManager } from "../DecksManager";
import { MightDeck } from "../MightDeck";

describe("DeckManager", () => {
  describe("startDraw", () => {
    it("should return a valid DrawSession ", () => {
      const whiteDeck = new MightDeck([new Card(1), new Card(1)]);
      const blackDeck = new MightDeck([new Card(3), new Card(3)]);
      const decksManager = new DecksManager({
        "0": whiteDeck,
        "3": blackDeck,
      });

      const results = decksManager.startDraw(3, { "3": 2 });

      const expected = {
        isMiss: false,
        cardsDrawn: 3,
        totalDamage: 7,
        isInfinite: false,
        critCount: 0,
        damageValues: [1, 3, 3],
      };
      expect(results).toEqual(expected);
    });
    it("should draw all from deck '0' if no empower is provided", () => {
      const whiteDeck = new MightDeck([new Card(1), new Card(1)]);
      const blackDeck = new MightDeck([new Card(3), new Card(3)]);
      const decksManager = new DecksManager({
        "0": whiteDeck,
        "3": blackDeck,
      });

      const results = decksManager.startDraw(4);

      const expected = {
        isMiss: false,
        cardsDrawn: 4,
        totalDamage: 4,
        isInfinite: false,
        critCount: 0,
        damageValues: [1, 1, 1, 1],
      };
      expect(results).toEqual(expected);
    });
    it("should correctly determine if a miss was triggered", () => {
      const whiteDeck = new MightDeck([new Card(1), new Card(0)]);
      const blackDeck = new MightDeck([new Card(3), new Card(0)]);
      const decksManager = new DecksManager({
        "0": whiteDeck,
        "3": blackDeck,
      });

      const results = decksManager.startDraw(4, { "3": 2 });

      const expected = {
        isMiss: true,
        cardsDrawn: 4,
        totalDamage: 4,
        isInfinite: false,
        critCount: 0,
        damageValues: [1, 0, 3, 0],
      };
      expect(results).toEqual(expected);
    });
    it("should update critCount if crit was triggered", () => {
      const whiteDeck = new MightDeck([new Card(1), new Card(0)]);
      const blackDeck = new MightDeck([
        new Card(5, true),
        new Card(3, true),
        new Card(0),
      ]);
      const decksManager = new DecksManager({
        "0": whiteDeck,
        "3": blackDeck,
      });

      const results = decksManager.startDraw(3, { "3": 1 });

      const expected = {
        isMiss: false,
        cardsDrawn: 5,
        totalDamage: 9,
        isInfinite: false,
        critCount: 2,
        damageValues: [1, 0, 5, 3, 0],
      };
      expect(results).toEqual(expected);
    });
  });
});
