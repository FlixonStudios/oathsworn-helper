import { Card } from "../Card";

describe("Card", () => {
  it("creates a Card with default value of 0 and isCrit false", () => {
    const card = new Card();
    expect(card.value).toEqual(0);
    expect(card.isCrit).toEqual(false);
  });
  it.each([
    [new Card(), "0"],
    [new Card(1), "1"],
    [new Card(2), "2"],
    [new Card(2, true), "2*"],
  ])(
    "should have a name property that is initialized on construction",
    (card, expected) => {
      expect(card.name).toEqual(expected);
    }
  );
});
