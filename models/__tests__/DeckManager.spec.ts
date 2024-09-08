import { Card } from "../Card";
import { Damage } from "../Damage";
import { DeckManager } from "../DecksManager";
import { MightDeck } from "../MightDeck";

describe("DeckManager", () => {
  describe("startDraw", () => {
    it("should return a valid DrawSession ", () => {
      const whiteDeck = new MightDeck([new Card(1), new Card(1)]);
      const blackDeck = new MightDeck([new Card(3), new Card(3)]);
      const decksManager = new DeckManager({
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
        damageValues: [ new Damage(3), new Damage(3), new Damage(1),],
      };
      expect(results).toEqual(expected);
    });
    it("should draw and sum from multiple decks and return a valid DrawSession ", () => {
      const whiteDeck = new MightDeck([new Card(1), new Card(1)]);
      const yellowDeck = new MightDeck([new Card(), new Card()]);
      const redDeck = new MightDeck([new Card(4, true), new Card(), new Card()]);
      const blackDeck = new MightDeck([new Card(3), new Card(3)]);
      const decksManager = new DeckManager({
        "0": whiteDeck,
        "1": yellowDeck,
        "2": redDeck,
        "3": blackDeck,
      });

      const results = decksManager.startDraw(5, { "3": 1, "2": 2, "1": 1 });

      const expected = {
        isMiss: true,
        cardsDrawn: 6,
        totalDamage: 0,
        isInfinite: false,
        critCount: 1,
        damageValues: [
          new Damage(3),
          new Damage(4),
          new Damage(0),
          new Damage(0, false),
          new Damage(),
          new Damage(1),
        ],
      };
      expect(results).toEqual(expected);
    });
    it("should draw all from deck '0' if no empower is provided", () => {
      const whiteDeck = new MightDeck([new Card(1), new Card(1)]);
      const blackDeck = new MightDeck([new Card(3), new Card(3)]);
      const decksManager = new DeckManager({
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
        damageValues: [
          new Damage(1),
          new Damage(1),
          new Damage(1),
          new Damage(1),
        ],
      };
      expect(results).toEqual(expected);
    });
    it("should correctly determine if a miss was triggered", () => {
      const whiteDeck = new MightDeck([new Card(1), new Card(0)]);
      const blackDeck = new MightDeck([new Card(3), new Card(0)]);
      const decksManager = new DeckManager({
        "0": whiteDeck,
        "3": blackDeck,
      });

      const results = decksManager.startDraw(4, { "3": 2 });

      const expected = {
        isMiss: true,
        cardsDrawn: 4,
        totalDamage: 0,
        isInfinite: false,
        critCount: 0,
        damageValues: [
          new Damage(3),
          new Damage(),
          new Damage(1),
          new Damage(),
        ],
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
      const decksManager = new DeckManager({
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
        damageValues: [
          new Damage(5),
          new Damage(3, false),
          new Damage(0, false),
          new Damage(1),
          new Damage(),
        ],
      };
      expect(results).toEqual(expected);
    });
  });
});
