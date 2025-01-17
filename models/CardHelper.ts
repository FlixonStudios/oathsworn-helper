import { Card } from "./Card";

const CRIT_SYMBOL = "*";

export class CardHelper {
  public template: Card[] = [];
  public addSet(card: Card, count: number) {
    for (let i = 0; i < count; i++) {
      this.template.push(card);
    }
    return this;
  }
  public createDeckTemplate() {
    const template = [...this.template];
    this.template = [];
    return template;
  }
  public reset() {
    this.template = [];
    return this;
  }
  public sliceTillAfterCrit(targetNoOfCards: number, set: string[]) {
    if (set.length === 0) return [];

    let end = targetNoOfCards;

    for (let i = 0; i < end; i++) {
      if (set[i].endsWith(CRIT_SYMBOL)) {
        end++;
      }
      if (end > set.length - 1) {
        break;
      }
    }
    return set.slice(0, end);
  }
}
