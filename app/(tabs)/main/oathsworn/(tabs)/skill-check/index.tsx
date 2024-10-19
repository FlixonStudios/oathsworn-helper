import { AnimatedPressable } from "@/components/pressable/AnimatedPressable";
import { ColoredText, Text } from "@/components/text/text";
import { StackedRow, ValueWithToggle } from "@/components/view";
import { NUM_OF_CARDS } from "@/constants/model";
import {
  BasicScrollView,
  CenteredView,
  Color,
  colorMap,
} from "@/constants/styles";
import { useGame } from "@/context-providers/oathsworn/oathsworn-hook";
import { DeckManager } from "@/models/DecksManager";
import { MightDeck } from "@/models/MightDeck";
import { Optimizer } from "@/models/Optimizer";
import { Probability } from "@/models/Probability";
import { Empower, SkillCheckResult } from "@/models/types";
import { useState } from "react";
import { ImageBackground } from "react-native";
import { ResultsSection } from "./components/results-section";
import {
  CalculateButton,
  MightSection,
  SeekButton,
  SkillCheckContent,
  SkillCheckSection,
} from "./skill-check.styles";

export default function SkillCheckPage() {
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
      "0": new MightDeck().createFromDeck(decks[0]),
      "1": new MightDeck().createFromDeck(decks[1]),
      "2": new MightDeck().createFromDeck(decks[2]),
      "3": new MightDeck().createFromDeck(decks[3]),
    });
    const p = new Probability(deckManager);
    const optimizer = new Optimizer();
    // TODO: add get iteration config here
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
    <BasicScrollView contentContainerStyle={{ display: "flex", flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/oathsworn-bg.png")}
        imageStyle={{ resizeMode: "cover" }}
        style={{ flex: 1, width: "100%" }}
      >
        <CenteredView style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}>
          <SkillCheckSection>
            <Text.H3 style={{ color: Color.WHITE }}>
              Skill Check section
            </Text.H3>
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
                    <AnimatedPressable
                      key={i}
                      Component={SeekButton}
                      color={colorMap[i]}
                      onPress={() => addMight(i)}
                      onLongPress={() => resetSkill(i)}
                    >
                      <ColoredText bgColor={colorMap[i]} text={might[i]} />
                    </AnimatedPressable>
                  );
                })}
              </MightSection>
              <AnimatedPressable
                Component={CalculateButton}
                onPress={() => calculate()}
              >
                <Text.Body>Calculate</Text.Body>
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
      </ImageBackground>
    </BasicScrollView>
  );
}
