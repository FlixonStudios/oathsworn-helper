import { MISS_CONDITION } from "@/constants/model";
import { Damage } from "./Damage";
import { MightDeck } from "./MightDeck";
import { Decks, DrawSession, Empower, MightDecks } from "./types";

export class DeckManager {
  public drawSession: DrawSession = {
    isMiss: false,
    cardsDrawn: 0,
    totalDamage: 0,
    isInfinite: false,
    critCount: 0,
    damageValues: [],
  };
  constructor(public decks: MightDecks, public empower?: Empower) {}

  public startDraw(_noOfCards: number, _empower?: Empower) {
    let noOfCards = _noOfCards;
    let results = [];

    this.resetDrawSession();
    const empower = _empower ?? this.empower;
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

  public clone() {
    const clonedDecks: MightDecks = {
      "0": this.decks["0"].clone(),
      "1": this.decks?.["1"] ? this.decks?.["1"].clone() : undefined,
      "2": this.decks?.["2"] ? this.decks?.["2"].clone() : undefined,
      "3": this.decks?.["3"] ? this.decks?.["3"].clone() : undefined,
    };
    return new DeckManager(clonedDecks, this.empower);
  }

  public shuffleDecks() {
    Object.keys(this.decks).forEach((index) =>
      this.decks[index as keyof Decks<MightDeck | number>]?.shuffle()
    );
    return this;
  }

  private mergeDrawSessions(drawSessions: DrawSession[]) {
    const combinedSession = drawSessions.reduce((session, currentSession) => {
      const damageValues = session.damageValues.concat(
        ...currentSession.damageValues
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
        isInfinite: false, // FIXME: is this required?
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
      const found = this.findMissedDamage(_damageValues, missCondition);
      if (found < 0) {
        break;
      }

      _damageValues.splice(found, 1);
      isMissCount++;

      if (isMissCount >= missCondition.timesValueAppeared) {
        isMiss = true;
        break;
      }
    }

    return isMiss;
  }

  private findMissedDamage(
    _damageValues: Damage[],
    missCondition = MISS_CONDITION
  ) {
    return _damageValues.findIndex(
      (dmg) => dmg.canMiss && dmg.value === missCondition.valueCausingMiss
    );
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
