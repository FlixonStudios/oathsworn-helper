import { Card } from "../Card";
import { LIMIT_PER_DRAW, MightDeck } from "../MightDeck";

describe("MightDeck", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("draw", () => {
    it("should increment critCount if isCrit is true", () => {
      const mockCards = [new Card(2, true), new Card(1)];
      const deck = new MightDeck(mockCards);

      expect(deck.draw()).toStrictEqual(new Card(2, true));
      expect(deck.remainingCards.length).toEqual(1);
      expect(deck.critCount).toEqual(1);
    });
    it.each([
      [2, 2, [new Card(2, true), new Card(1)]],
      [0, 1, []],
      [3, 3, [new Card(), new Card()]],
    ])("should increment drawCount to %s", (expected, noOfDraws, mockCards) => {
      const deck = new MightDeck(mockCards);
      for (let i = 0; i < noOfDraws; i++) {
        deck.draw();
      }
      expect(deck.drawCount).toEqual(expected);
    });
    it("should perform a shuffle if no more cards in remaining", () => {
      const mockCards = [new Card(2, true), new Card(1)];
      const deck = new MightDeck();
      const shuffleSpy = jest.spyOn(deck, "shuffle");
      deck.template = mockCards;
      deck.drawnCards = mockCards;
      deck.draw();
      expect(shuffleSpy).toHaveBeenCalledTimes(1);
      expect(deck.remainingCards.length).toEqual(1);
    });
    it("should only ever draw 1 card even if all cards are isCrit=true", () => {
      const mockCards = [new Card(2, true)];
      const deck = new MightDeck(mockCards);
      const drawSpy = jest.spyOn(deck, "draw");
      deck.draw();
      expect(drawSpy).toHaveBeenCalledTimes(1);
      expect(deck.remainingCards.length).toEqual(0);
    });
    it("should push value to damageValues", () => {
      const mockCards = [
        new Card(),
        new Card(2, true),
        new Card(),
        new Card(1),
      ];
      const deck = new MightDeck(mockCards);
      for (let i = 0; i < mockCards.length; i++) {
        deck.draw();
      }

      expect(deck.damageValues).toEqual([0, 2, 0, 1]);
    });
  });
  describe("startDraw", () => {
    it("should draw till LIMIT_PER_DRAW is all cards are isCrit=true", () => {
      const mockCards = [new Card(2, true)];
      const deck = new MightDeck(mockCards);
      const drawSpy = jest.spyOn(deck, "draw");
      const result = deck.startDraw(1);

      expect(drawSpy).toHaveBeenCalledTimes(LIMIT_PER_DRAW + 1); // +1 as the last draw will be called but no card will be drawn
      expect(deck.remainingCards.length).toEqual(0);
      expect(result.cardsDrawn).toEqual(LIMIT_PER_DRAW);
    });
    it("should return if miss condition is met", () => {
      const mockCards = [
        new Card(),
        new Card(2, true),
        new Card(),
        new Card(1),
      ];
      const deck = new MightDeck(mockCards);
      const result = deck.startDraw(4);
      expect(result.isMiss).toEqual(true);
    });
    it.each([
      [3, 3, [new Card(1), new Card(1), new Card(1)]],
      [0, 4, [new Card(), new Card(1)]],
      [6, 4, [new Card(), new Card(2, true), new Card(1)]],
      [3, 4, [new Card(), new Card(1), new Card(1)]],
      [16, 4, [new Card(), new Card(2, true), new Card(2, true)]],
      [0, 4, [new Card(), new Card(), new Card(2, true)]],
    ])(
      "should return total damage of %s",
      (expectedDamage, noCardsToDraw, mockCards) => {
        // always first in first out for pile
        jest.spyOn(global.Math, "random").mockReturnValue(1);
        const deck = new MightDeck(mockCards);
        const result = deck.startDraw(noCardsToDraw);
        expect(result.totalDamage).toEqual(expectedDamage);
      }
    );
  });
  describe("hasMissed", () => {
    it.each([
      [[2, 2, 2], false],
      [[0], false],
      [[], false],
      [[0, 0], true],
      [[1, 0, 2, 1, 0], true],
    ])("it should correctly check %s for misses", (mockDmgs, expected) => {
      const deck = new MightDeck();
      expect(deck.hasMissed(mockDmgs)).toEqual(expected);
    });
  });
});
