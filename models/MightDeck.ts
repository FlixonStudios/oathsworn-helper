import {
  LIMIT_PER_DRAW,
  MISS_CONDITION,
} from "@/constants/model";
import { Card } from "./Card";
import { Damage } from "./Damage";
import { Deck } from "./Deck";
import { DrawSession } from "./types";

export class MightDeck extends Deck {
  public drawSession: DrawSession = {
    isMiss: false,
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
  public hasMissed(damages: Damage[], missCondition = MISS_CONDITION) {
    let isMiss = false;
    let isMissCount = 0;
    const _damageValues = [...damages];

    for (let i = 0; i < damages.length; i++) {
      const index = _damageValues.findIndex(
        (dmg) => dmg.canMiss && dmg.value === missCondition.valueCausingMiss
      );
      if (index < 0) {
        break;
      }
      _damageValues.splice(index, 1);
      isMissCount++;
      if (isMissCount >= missCondition.timesValueAppeared) {
        isMiss = true;
        break;
      }
    }

    return isMiss;
  }
  public clone(): MightDeck {
    const clone = new MightDeck(
      [...this.template],
      [...this.remainingCards],
      [...this.drawnCards]
    );
    clone.drawSession = { ...this.drawSession };
    return clone;
  }
  private calculateDamage(isMiss: boolean) {
    return isMiss
      ? 0
      : this.drawSession.damageValues.reduce(
          (prev, curr) => (prev += curr.value),
          0
        );
  }
  //FIXME: do we need this?
  private saveDrawSession() {
    const isMiss = this.hasMissed(this.drawSession.damageValues);
    this.drawSession = {
      cardsDrawn: this.drawSession.cardsDrawn,
      isMiss,
      totalDamage: this.calculateDamage(isMiss),
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
