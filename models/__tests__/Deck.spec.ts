import { Card } from "../Card";
import { Deck } from "../Deck";

describe("Deck", () => {
  it("should be able to be instantiated with a template of Cards", () => {
    const mockCards = [new Card(1)];
    const deck = new Deck(mockCards);

    expect(deck.template).toEqual(mockCards);
  });
  it("should also initialized remainingCards with template", () => {
    const mockCards = [new Card(1)];
    const deck = new Deck(mockCards);

    expect(deck.template).toEqual(deck.remainingCards);
  });
  describe("shuffle", () => {
    it("should empty drawnCards", () => {
      const mockCards = [new Card(1), new Card(2)];
      const deck = new Deck(mockCards);
      deck.drawnCards = [...mockCards];

      deck.shuffle();

      expect(deck.drawnCards.length).toEqual(0);
    });
    it("should reset the remainingCards to match template", () => {
      const mockCards = [new Card(1), new Card(2)];
      const deck = new Deck(mockCards);
      deck.remainingCards = [];

      deck.shuffle();

      expect(deck.remainingCards.length).toEqual(2);
      expect(
        deck.remainingCards.filter((card) => card.value === 1).length
      ).toEqual(1);
      expect(
        deck.remainingCards.filter((card) => card.value === 2).length
      ).toEqual(1);
    });
    it("should randomise the remainingCards", () => {
      jest
        .spyOn(global.Math, "random")
        .mockReturnValueOnce(0.75)
        .mockReturnValueOnce(0.5)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(0.25);
      const mockCards = [new Card(1), new Card(2), new Card(3), new Card(4)];
      const deck = new Deck(mockCards);
      deck.remainingCards = [];

      deck.shuffle();

      const expected = [new Card(4), new Card(2), new Card(3), new Card(1)];
      expect(deck.remainingCards).toStrictEqual(expected);
    });
  });
  describe("draw", () => {
    it("should return the first element of remaingCards", () => {
      const mockCards = [new Card(4), new Card(2), new Card(3), new Card(1)];
      const deck = new Deck(mockCards);
      const result = deck.draw();

      expect(result).toStrictEqual(new Card(4));
    });
  });
});
