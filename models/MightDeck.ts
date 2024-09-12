import { LIMIT_PER_DRAW } from "@/constants/model";
import { Card } from "./Card";
import { Damage } from "./Damage";
import { Deck } from "./Deck";
import { DrawSession } from "./types";

export class MightDeck extends Deck {
  public drawSession: DrawSession = {
    cardsDrawn: 0,
    totalDamage: 0,
    isInfinite: false,
    critCount: 0,
    damageValues: [],
  };
  // does not apply crit
  public draw(isMissable = true): Card | undefined {
    if (this.drawSession.cardsDrawn >= LIMIT_PER_DRAW) {
      return;
    }

    const drawn = super.draw();

    if (!drawn) return; // no cards in deck
    this.drawSession.cardsDrawn++;

    const damage = new Damage(drawn?.damage.value, isMissable);
    this.drawSession.damageValues.push(damage);

    if (drawn?.isCrit) {
      this.drawSession.critCount++;
    }
    return drawn;
  }

  public startDraw(noOfCards: number) {
    this.resetDrawSession();
    for (let i = 0; i < noOfCards; i++) {
      this.draw();
    }
    for (let i = 0; i < this.drawSession.critCount; i++) {
      this.draw(false);
    }
    this.saveDrawSession();

    return this.drawSession;
  }

  public clone(): MightDeck {
    const clone = new MightDeck();
    clone.template = [...this.template];
    clone.remainingCards = [...this.remainingCards];
    clone.drawnCards = [...this.drawnCards];
    clone.drawSession = { ...this.drawSession };
    return clone;
  }

  public createFromDeck(deck: Deck) {
    this.template = [...deck.template];
    this.remainingCards = [...deck.remainingCards];
    this.drawnCards = [...deck.drawnCards];
    return this;
  }

  private calculateDamage() {
    return this.drawSession.damageValues.reduce(
      (prev, curr) => (prev += curr.value),
      0
    );
  }
  //FIXME: do we need this?
  private saveDrawSession() {
    this.drawSession = {
      cardsDrawn: this.drawSession.cardsDrawn,
      totalDamage: this.calculateDamage(),
      isInfinite: this.drawSession.cardsDrawn >= LIMIT_PER_DRAW,
      critCount: this.drawSession.critCount,
      damageValues: this.drawSession.damageValues,
    };
  }
  private resetDrawSession() {
    this.drawSession = {
      isMiss: false,
      cardsDrawn: 0,
      totalDamage: 0,
      isInfinite: false,
      critCount: 0,
      damageValues: [],
    };
  }
}
