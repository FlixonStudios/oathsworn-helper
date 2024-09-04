import { Text } from "react-native";
import {
  Container,
  SeekButton,
  SkillCheckContent,
  SkillCheckSection,
  MainPageContainer,
  TargetSection,
  MightSection,
  ChangeTargetButton,
  CurrentTarget,
  CalculateButton,
} from "./main.styles";
import { useState } from "react";
import { useGame } from "@/context-providers/game/game-hook";
import { colorMap } from "@/constants/styles";
import { Probability } from "@/models/Probability";
import { MightDeck } from "@/models/MightDeck";
import { Empower, Recommendations } from "@/models/types";
import { DeckManager } from "@/models/DecksManager";
import { ResultsSection } from "./components/results-section";

export default function MainPage() {
  const { gameState } = useGame();

  const [skillCheckTarget, setSkillCheckTarget] = useState(0);
  const [might, setMight] = useState<Empower>({});
  const [skillCheckResults, setSkillCheckResults] = useState<Recommendations>();

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
    const p = new Probability();
    const deckManager = new DeckManager({
      "0": new MightDeck(decks[0].remainingCards),
      "1": new MightDeck(decks[1].remainingCards),
      "2": new MightDeck(decks[2].remainingCards),
      "3": new MightDeck(decks[3].remainingCards),
    });
    const results = p.skillCheck(deckManager, skillCheckTarget, might);
    setSkillCheckResults({ ...results });
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
    <MainPageContainer>
      <Container>
        <Text>Welcome!</Text>
        <SkillCheckSection>
          <Text>Skill Check section</Text>
          <SkillCheckContent>
            <TargetSection>
              <ChangeTargetButton onPress={() => onPress(-1)}>
                <Text>{"<"}</Text>
              </ChangeTargetButton>
              <CurrentTarget>{skillCheckTarget}</CurrentTarget>
              <ChangeTargetButton onPress={() => onPress(1)}>
                <Text>{">"}</Text>
              </ChangeTargetButton>
            </TargetSection>
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
            <CalculateButton onPress={() => calculate()}>
              <Text>Calculate</Text>
            </CalculateButton>
            <ResultsSection
              skillCheckResults={skillCheckResults}
              start={0}
              end={5}
            />
            <ResultsSection
              skillCheckResults={skillCheckResults}
              start={5}
              end={10}
            />
          </SkillCheckContent>
        </SkillCheckSection>
      </Container>
    </MainPageContainer>
  );
}
