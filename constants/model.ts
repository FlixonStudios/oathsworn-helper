import { CalculationSpeed } from "@/context-providers/oathsworn/types";
import { DrawSession } from "@/models/types";

export const DEFAULT_DRAW_SESSION: DrawSession = {
  isMiss: false,
  cardsDrawn: 0,
  totalDamage: 0,
  isInfinite: false,
  critCount: 0,
  damageValues: [],
};

export const MISS_CONDITION = {
  valueCausingMiss: 0,
  timesValueAppeared: 2,
};

export const LIMIT_PER_DRAW = 100;

export const NUM_OF_CARDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const IterationSet: Record<
  CalculationSpeed,
  { iterations: number; iterationArr: number[] }
> = {
  [CalculationSpeed.SLOW]: { iterations: 4000, iterationArr: [100, 500, 2500] },
  [CalculationSpeed.FAST]: { iterations: 1000, iterationArr: [100, 300, 800] },
};
