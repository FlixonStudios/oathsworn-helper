import { Card } from "./Card";

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
}
