import { DEFAULT_DRAW_SESSION, MISS_CONDITION } from "@/constants/model";
import { MightDeck } from "./MightDeck";
import { Decks, DrawSession, Empower, MightDecks } from "./types";

export class DecksManager {
  public drawSession: DrawSession = DEFAULT_DRAW_SESSION;
  constructor(public decks: MightDecks) {}

  public startDraw(_noOfCards: number, empower?: Empower) {
    this.resetDrawSession();
    let noOfCards = _noOfCards;
    let results = [];

    for (let i = 3; i >= 1; i--) {
      const index = i.toString() as keyof Decks<MightDeck | number>;
      if (!empower || !this.decks[index] || !empower[index]) {
        continue;
      }
      let amtToDraw = noOfCards >= empower[index] ? empower[index] : noOfCards;
      // each deck has 1 result
      results.push(this.decks[index].startDraw(empower[index]));
      noOfCards -= amtToDraw;
    }

    results.push(this.decks[0].startDraw(noOfCards));

    return this.mergeDrawSessions(results);
  }

  private mergeDrawSessions(drawSessions: DrawSession[]) {
    const combinedSession = drawSessions.reduce((session, currentSession) => {
      const damageValues = currentSession.damageValues.concat(
        ...session.damageValues
      );
      const isMiss = currentSession.isMiss
        ? true
        : this.hasMissed(damageValues);
      return {
        cardsDrawn: currentSession.cardsDrawn + session.cardsDrawn,
        totalDamage: currentSession.totalDamage + session.totalDamage,
        critCount: currentSession.critCount + session.critCount,
        damageValues,
        isMiss,
        isInfinite: false,
      };
    });
    this.drawSession = combinedSession;
    this.drawSession.isMiss = this.hasMissed(this.getEligibleForMissDamage());
    return combinedSession;
  }

  private hasMissed(values: number[], missCondition = MISS_CONDITION) {
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
  // FIXME: BROKEN
  private getEligibleForMissDamage() {
    const numArr = this.drawSession.damageValues.slice(
      0,
      this.drawSession.critCount > 0
        ? -this.drawSession.critCount
        : this.drawSession.damageValues.length
    );
    return numArr;
  }
  private resetDrawSession() {
    this.drawSession = DEFAULT_DRAW_SESSION;
  }
}
