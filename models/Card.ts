export class Card {
  public name = "";
  constructor(public value = 0, public isCrit = false) {
    this.name = this.value.toString() + (this.isCrit ? "*" : "");
  }
}
