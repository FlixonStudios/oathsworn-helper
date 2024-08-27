import { Card } from "../Card";

describe("Card", () => {
  it("creates a Card with default value of 0 and isCrit false", () => {
    const card = new Card();
    expect(card.value).toEqual(0);
    expect(card.isCrit).toEqual(false);
  });
});


