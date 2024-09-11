import { LIMIT_PER_DRAW } from "@/constants/model";
import { Card } from "../Card";
import { Damage } from "../Damage";
import { Deck } from "../Deck";
import { MightDeck } from "../MightDeck";

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
      expect(deck.drawSession.critCount).toEqual(1);
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
      expect(deck.drawSession.cardsDrawn).toEqual(expected);
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

      expect(deck.drawSession.damageValues).toEqual([
        new Damage(0),
        new Damage(2),
        new Damage(0),
        new Damage(1),
      ]);
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
    it.each([
      [3, 3, [new Card(1), new Card(1), new Card(1)]],
      [2, 4, [new Card(), new Card(1)]],
      [6, 4, [new Card(), new Card(2, true), new Card(1)]],
      [3, 4, [new Card(), new Card(1), new Card(1)]],
      [16, 4, [new Card(), new Card(2, true), new Card(2, true)]],
      [4, 4, [new Card(), new Card(), new Card(2, true)]],
    ])(
      "should return total damage of %s",
      (expectedDamage, noCardsToDraw, mockCards) => {
        // always first in last out for pile
        jest.spyOn(global.Math, "random").mockReturnValue(1);
        const deck = new MightDeck(mockCards);
        const result = deck.startDraw(noCardsToDraw);
        expect(result.totalDamage).toEqual(expectedDamage);
      }
    );
  });
  describe("createFromDeck", () => {
    it("should create a MightDeck from a existing mutated Deck", () => {
      const deck = new Deck([new Card(1), new Card(2), new Card(3)]);
      deck.remainingCards = [new Card(1)];
      deck.drawnCards = [new Card(2), new Card(3)];
      const expected = new MightDeck([new Card(1), new Card(2), new Card(3)]);
      expected.remainingCards = [new Card(1)];
      expected.drawnCards = [new Card(2), new Card(3)];

      expect(new MightDeck().createFromDeck(deck)).toEqual(expected);
    });
    it("should create an equivalent MightDeck after drawing from Deck", () => {
      const deck = new Deck([new Card(1), new Card(2), new Card(3)]);
      deck.draw();
      deck.draw();
      const expected = new MightDeck([new Card(1), new Card(2), new Card(3)]);
      expected.remainingCards = [new Card(3)];
      expected.drawnCards = [new Card(1), new Card(2)];

      expect(new MightDeck().createFromDeck(deck)).toEqual(expected);
    });
    it("should create an equivalent MightDeck after shuffle", () => {
      jest.spyOn(global.Math, "random").mockReturnValueOnce(1);
      const deck = new Deck([new Card(1), new Card(2), new Card(3)]);
      deck.draw();
      deck.draw();
      deck.draw();
      deck.draw();
      const expected = new MightDeck([new Card(1), new Card(2), new Card(3)]);
      expected.remainingCards = [new Card(2), new Card(1)];
      expected.drawnCards = [new Card(3)];

      expect(new MightDeck().createFromDeck(deck)).toEqual(expected);
    });
  });
});
