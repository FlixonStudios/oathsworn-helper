import { AnimatedPressable } from "@/components/pressable/AnimatedPressable";
import { StackedRow, ValueWithToggle } from "@/components/view";
import { NUM_OF_CARDS } from "@/constants/model";
import { BasicScrollView, CenteredView, colorMap } from "@/constants/styles";
import { useGame } from "@/context-providers/game/game-hook";
import { DeckManager } from "@/models/DecksManager";
import { MightDeck } from "@/models/MightDeck";
import { Optimizer } from "@/models/Optimizer";
import { Probability } from "@/models/Probability";
import { Empower, SkillCheckResult } from "@/models/types";
import { useState } from "react";
import { Text } from "react-native";
import { ResultsSection } from "./components/results-section";
import {
  CalculateButton,
  MightSection,
  SeekButton,
  SkillCheckContent,
  SkillCheckSection,
} from "./main.styles";

export default function MainPage() {
  const { gameState } = useGame();

  const [skillCheckTarget, setSkillCheckTarget] = useState(0);
  const [might, setMight] = useState<Empower>({});
  const [skillCheckResults, setSkillCheckResults] =
    useState<SkillCheckResult[]>();

  const { decks } = gameState;
  const decksToUse: Array<"1" | "2" | "3"> = ["1", "2", "3"];

  function onPress(val: number) {
    if (val < 0 && skillCheckTarget === 0) return;
    setSkillCheckTarget(skillCheckTarget + val);
  }

  function resetSkill(index: "1" | "2" | "3") {
    const newMight = { ...might };
    if (newMight[index]) {
      newMight[index] = 0;
      setMight(newMight);
    }
  }

  function calculate() {
    const deckManager = new DeckManager({
      "0": new MightDeck(decks[0].remainingCards),
      "1": new MightDeck(decks[1].remainingCards),
      "2": new MightDeck(decks[2].remainingCards),
      "3": new MightDeck(decks[3].remainingCards),
    });
    const p = new Probability(deckManager);
    const optimizer = new Optimizer();
    const results = optimizer.optimizeResults(
      {
        top: 4,
        keyForValue: "p_target",
        keyForScenario: "cardsToDraw",
        initialTargetedScenarios: NUM_OF_CARDS,
        finalIteration: 5000,
      },
      ({ iterations, targetedScenarios }) =>
        p.skillCheck({
          target: skillCheckTarget,
          baseMight: might,
          iterations,
          targetedScenarios,
        })
    );
    setSkillCheckResults([...results]);
  }

  function addMight(index: "1" | "2" | "3") {
    const newMight = { ...might };
    if (!newMight[index]) {
      newMight[index] = 1;
    } else {
      newMight[index]++;
    }
    setMight(newMight);
  }

  return (
    <BasicScrollView>
      <CenteredView>
        <Text>Welcome!</Text>
        <SkillCheckSection>
          <Text>Skill Check section</Text>
          <SkillCheckContent>
            <ValueWithToggle
              decreaseText="<"
              onDecrease={() => onPress(-1)}
              increaseText=">"
              onIncrease={() => onPress(1)}
              value={skillCheckTarget}
            />
            <MightSection>
              {decksToUse.map((i) => {
                return (
                  <SeekButton
                    key={i}
                    style={{ backgroundColor: colorMap[i] }}
                    onPress={() => addMight(i)}
                    onLongPress={() => resetSkill(i)}
                  >
                    <Text>{might[i]}</Text>
                  </SeekButton>
                );
              })}
            </MightSection>
            <AnimatedPressable
              Component={CalculateButton}
              onPress={() => calculate()}
            >
              <Text>Calculate</Text>
            </AnimatedPressable>
            {skillCheckResults && (
              <StackedRow
                values={skillCheckResults}
                Component={ResultsSection}
              />
            )}
          </SkillCheckContent>
        </SkillCheckSection>
      </CenteredView>
    </BasicScrollView>
  );
}
