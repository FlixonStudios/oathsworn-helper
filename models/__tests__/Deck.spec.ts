import { Card } from "../Card";
import { Deck, DeckCardCount } from "../Deck";

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
  describe("shuffleAllTogether", () => {
    it("should empty drawnCards", () => {
      const mockCards = [new Card(1), new Card(2)];
      const deck = new Deck();
      deck.drawnCards = [...mockCards];

      deck.shuffleAllTogether();
      expect(deck.drawnCards.length).toEqual(0);
    });
    it("should reset the remainingCards to match template", () => {
      const mockCards = [new Card(1), new Card(2)];
      const deck = new Deck(mockCards);
      deck.remainingCards = [];

      deck.shuffleAllTogether();

      expect(deck.remainingCards.length).toEqual(2);
      expect(
        deck.remainingCards.filter((card) => card.damage.value === 1).length
      ).toEqual(1);
      expect(
        deck.remainingCards.filter((card) => card.damage.value === 2).length
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

      deck.shuffleAllTogether();

      const expected = [new Card(4), new Card(2), new Card(3), new Card(1)];
      expect(deck.remainingCards).toStrictEqual(expected);
    });
  });

  describe("shuffleWithoutSomeCards", () => {
    beforeAll(() => {
      jest.spyOn(global.Math, "random").mockReturnValue(0);
    });
    afterAll(() => {
      jest.clearAllMocks();
    });
    it("should shuffle back drawn cards except for cards to not reshuffle", () => {
      const mockCards = [new Card(1), new Card(2), new Card(3), new Card(4)];
      const deck = new Deck(mockCards);

      deck.shuffleAllTogetherWithSomeInDrawn([new Card(2)]);

      expect(deck.remainingCards.length).toEqual(3);
      expect(deck.remainingCards).toEqual([
        new Card(1),
        new Card(3),
        new Card(4),
      ]);
      expect(deck.drawnCards).toStrictEqual([new Card(2)]);
    });
    it("should have empty drawnCards and full remainingCards if pass empty array", () => {
      const mockCards = [new Card(1), new Card(2), new Card(3), new Card(4)];
      const deck = new Deck(mockCards);

      deck.shuffleAllTogetherWithSomeInDrawn([]);

      expect(deck.remainingCards.length).toEqual(4);
      expect(deck.remainingCards).toEqual([
        new Card(1),
        new Card(2),
        new Card(3),
        new Card(4),
      ]);
      expect(deck.drawnCards).toStrictEqual([]);
    });
    it("should work with repeats", () => {
      const mockCards = [new Card(2), new Card(2), new Card(2)];
      const deck = new Deck(mockCards);

      deck.shuffleAllTogetherWithSomeInDrawn([new Card(2), new Card(2)]);

      expect(deck.remainingCards.length).toEqual(1);
      expect(deck.remainingCards).toEqual([new Card(2)]);
      expect(deck.drawnCards).toStrictEqual([new Card(2), new Card(2)]);
    });
    it("should work with empty deck template", () => {
      const deck = new Deck([]);

      deck.shuffleAllTogetherWithSomeInDrawn([new Card(2)]);

      expect(deck.remainingCards.length).toEqual(0);
      expect(deck.remainingCards).toEqual([]);
      expect(deck.drawnCards).toStrictEqual([new Card(2)]);
    });
  });

  describe("shuffleRemaining", () => {
    it("should only shuffle the remaining cards pile", () => {
      jest.spyOn(global.Math, "random").mockReturnValueOnce(1);
      const mockCards = [new Card(1), new Card(2), new Card(3), new Card(4)];
      const deck = new Deck(mockCards);
      deck.remainingCards = [new Card(3), new Card(4)];
      deck.drawnCards = [new Card(1), new Card(2)];
      deck.shuffleRemaining();
      const expected = [new Card(4), new Card(3)];
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
    it("should trigger shuffle if draw is called while remaining is empty", () => {
      const mockCards = [new Card(4)];
      const deck = new Deck(mockCards);
      const shuffleSpy = jest.spyOn(deck, "shuffleAllTogether");

      deck.draw();
      const result = deck.draw();

      expect(shuffleSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(new Card(4));
    });
    it("should return undefined if trying to draw from an empty deck", () => {
      const deck = new Deck();
      const shuffleSpy = jest.spyOn(deck, "shuffleAllTogether");

      const result = deck.draw();

      expect(shuffleSpy).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
  describe("getUniqueCardList", () => {
    it("should return empty array if empty deck", () => {
      const deck = new Deck();
      expect(deck.getUniqueCardList()).toEqual([]);
    });
    it("should return an array of unique card names", () => {
      const mockCards = [
        new Card(4, true),
        new Card(4),
        new Card(),
        new Card(),
        new Card(1, true),
        new Card(4),
      ];
      const deck = new Deck(mockCards);
      const result = deck.getUniqueCardList();
      expect(result).toContain("4*");
      expect(result).toContain("0");
      expect(result).toContain("1*");
      expect(result).toContain("4");
      expect(result.length).toEqual(4);
    });
  });
  describe("seek", () => {
    it("should return undefined if no such card exists", () => {
      const mockCards = [new Card(), new Card()];
      const deck = new Deck(mockCards);
      expect(deck.seek("4*")).toBeUndefined();
      expect(deck.remainingCards.length).toEqual(2);
      expect(deck.drawnCards.length).toEqual(0);
    });
    it("should remove the card matching the name and return it", () => {
      const mockCards = [
        new Card(3),
        new Card(1, true),
        new Card(),
        new Card(4, true),
        new Card(1, true),
        new Card(),
        new Card(4),
      ];
      const deck = new Deck(mockCards);
      expect(deck.seek("4*")).toStrictEqual(new Card(4, true));
      expect(deck.remainingCards.length).toEqual(6);

      expect(deck.seek("0")).toStrictEqual(new Card(0));
      expect(deck.remainingCards.length).toEqual(5);
      expect(deck.seek("0")).toStrictEqual(new Card(0));
      expect(deck.remainingCards.length).toEqual(4);
    });
    it("should move the seeked card to drawn", () => {
      const mockCards = [new Card(), new Card()];
      const deck = new Deck(mockCards);

      expect(deck.seek("0")).toStrictEqual(new Card(0));
      expect(deck.remainingCards.length).toEqual(1);
      expect(deck.drawnCards.length).toEqual(1);
      expect(deck.seek("0")).toStrictEqual(new Card(0));
      expect(deck.remainingCards.length).toEqual(0);
      expect(deck.drawnCards.length).toEqual(2);
    });
  });
  describe("revert", () => {
    it("should return undefined if no such card exists", () => {
      const mockCards = [new Card(), new Card()];
      const deck = new Deck();
      deck.drawnCards = mockCards;
      expect(deck.revert("4*")).toBeUndefined();
      expect(deck.drawnCards.length).toEqual(2);
      expect(deck.remainingCards.length).toEqual(0);
    });
    it("should remove the card matching the name and return it", () => {
      const mockCards = [
        new Card(3),
        new Card(1, true),
        new Card(),
        new Card(4, true),
        new Card(1, true),
        new Card(),
        new Card(4),
      ];
      const deck = new Deck();
      deck.drawnCards = mockCards;
      expect(deck.revert("4*")).toStrictEqual(new Card(4, true));
      expect(deck.drawnCards.length).toEqual(6);

      expect(deck.revert("0")).toStrictEqual(new Card(0));
      expect(deck.drawnCards.length).toEqual(5);
      expect(deck.revert("0")).toStrictEqual(new Card(0));
      expect(deck.drawnCards.length).toEqual(4);
    });
    it("should move the reverted card to drawn", () => {
      const mockCards = [new Card(), new Card()];
      const deck = new Deck();
      deck.drawnCards = mockCards;

      expect(deck.revert("0")).toStrictEqual(new Card(0));
      expect(deck.drawnCards.length).toEqual(1);
      expect(deck.remainingCards.length).toEqual(1);
      expect(deck.revert("0")).toStrictEqual(new Card(0));
      expect(deck.drawnCards.length).toEqual(0);
      expect(deck.remainingCards.length).toEqual(2);
    });
  });
  describe("getCountOfCard", () => {
    it("should return the count of cards", () => {
      const deck = new Deck();
      deck.remainingCards = [new Card(2), new Card(2, true)];
      deck.drawnCards = [new Card(), new Card(1), new Card(), new Card(1)];

      const expected: DeckCardCount = {
        remaining: {
          "2": 1,
          "2*": 1,
        },
        drawn: {
          "0": 2,
          "1": 2,
        },
      };
      expect(deck.getDeckCardCount()).toEqual(expected);
    });
    it("should return empty object for both remaining and drawn if there are no cards", () => {
      const deck = new Deck();
      const expected: DeckCardCount = {
        remaining: {},
        drawn: {},
      };
      expect(deck.getDeckCardCount()).toEqual(expected);
    });
  });
});
