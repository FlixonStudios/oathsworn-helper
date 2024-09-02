import { Damage } from "./Damage";

export class Card {
  public name = "";
  public damage: Damage;
  constructor(value = 0, public isCrit = false) {
    this.damage = new Damage(value);
    this.name = this.damage.value.toString() + (this.isCrit ? "*" : "");
  }
}
