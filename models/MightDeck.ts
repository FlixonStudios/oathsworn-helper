import { nanoid } from "nanoid";
import { Card } from "./Card";
import { Deck } from "./Deck";

interface DrawSession {
  totalDamage: number;
  cardsDrawn: number;
  isMiss: boolean;
  isInfinite: boolean;
  critCount: number;
}
const MISS_CONDITION = {
  valueCausingMiss: 0,
  timesValueAppeared: 2,
};
export const LIMIT_PER_DRAW = 100;
export class MightDeck extends Deck {
  public damageValues: number[] = [];
  public critCount: number = 0;
  public drawCount: number = 0;
  public drawSession: DrawSession = {
    isMiss: false,
    cardsDrawn: 0,
    totalDamage: 0,
    isInfinite: false,
    critCount: 0,
  };

  public draw(): Card | undefined {
    if (this.drawCount >= LIMIT_PER_DRAW) {
      return;
    }

    const drawn = super.draw();

    if (!drawn) return; // no cards in deck
    this.drawCount++;

    this.damageValues.push(drawn?.value);

    if (drawn?.isCrit) {
      this.critCount++;
    }
    return drawn;
  }

  public startDraw(noOfCards: number) {
    for (let i = 0; i < noOfCards; i++) {
      this.draw();
    }
    for (let i = 0; i < this.critCount; i++) {
      this.draw();
    }
    this.saveDrawSession();
    this.resetDrawCount();
    this.resetCritCount();
    return this.drawSession;
  }
  public hasMissed(values: number[], missCondition = MISS_CONDITION) {
    let isMiss = false;
    let isMissCount = 0;
    const _damageValues = [...values];

    for (let i = 0; i < values.length; i++) {
      const index = _damageValues.findIndex(
        (dmg) => dmg === missCondition.valueCausingMiss
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
    clone.damageValues = [...this.damageValues];
    clone.critCount = this.critCount;
    clone.drawCount = this.drawCount;
    clone.drawSession = { ...this.drawSession };
    return clone;
  }
  private calculateDamage(isMiss: boolean) {
    return isMiss ? 0 : this.damageValues.reduce((prev, val) => (val += prev));
  }
  private saveDrawSession() {
    const isMiss = this.hasMissed(this.getEligibleForMissDamage());
    this.drawSession = {
      cardsDrawn: this.drawCount,
      isMiss,
      totalDamage: this.calculateDamage(isMiss),
      isInfinite: this.drawCount >= LIMIT_PER_DRAW,
      critCount: this.critCount,
    };
  }
  private getEligibleForMissDamage() {
    const numArr = this.damageValues.slice(
      0,
      this.critCount > 0 ? -this.critCount : this.damageValues.length
    );
    return numArr;
  }
  private resetDrawCount() {
    this.drawCount = 0;
  }
  private resetCritCount() {
    this.critCount = 0;
  }
}
