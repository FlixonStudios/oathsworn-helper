import { MISS_CONDITION } from "@/constants/model";
import { Damage } from "./Damage";
import { MightDeck } from "./MightDeck";
import { Decks, DrawSession, Empower, MightDecks } from "./types";

export class DecksManager {
  public drawSession: DrawSession = {
    isMiss: false,
    cardsDrawn: 0,
    totalDamage: 0,
    isInfinite: false,
    critCount: 0,
    damageValues: [],
  };
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
    this.drawSession.isMiss = this.hasMissed(this.drawSession.damageValues);
    return combinedSession;
  }

  private hasMissed(values: Damage[], missCondition = MISS_CONDITION) {
    let isMiss = false;
    let isMissCount = 0;
    const _damageValues = [...values];

    for (let i = 0; i < values.length; i++) {
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
