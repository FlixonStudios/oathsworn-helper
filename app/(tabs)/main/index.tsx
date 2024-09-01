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
  ResultsSection,
  ResultCard,
  ResultValue,
} from "./main.styles";
import { useState } from "react";
import { useGame } from "@/context-providers/game/game-hook";
import { colorMap } from "@/constants/styles";
import { Probability, Recommendations } from "@/models/Probability";
import { MightDeck } from "@/models/MightDeck";

export default function MainPage() {
  const { gameState } = useGame();

  const [skillCheckTarget, setSkillCheckTarget] = useState(0);
  const [skillCheckResults, setSkillCheckResults] = useState<Recommendations>();

  const { decks } = gameState;
  const decksToUse = [1, 2, 3];

  function onPress(val: number) {
    if (val < 0 && skillCheckTarget === 0) return;
    setSkillCheckTarget(skillCheckTarget + val);
  }

  function calculate() {
    const p = new Probability();
    const mightDeck = new MightDeck(decks[0].remainingCards);
    const results = p.skillCheck(mightDeck, skillCheckTarget);
    setSkillCheckResults({ ...results });
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
              {decksToUse.map((i) => (
                <SeekButton
                  key={i}
                  style={{ backgroundColor: colorMap[i] }}
                ></SeekButton>
              ))}
            </MightSection>
            <CalculateButton onPress={() => calculate()}>
              <Text>Calculate</Text>
            </CalculateButton>
            <ResultsSection>
              {skillCheckResults &&
                Object.keys(skillCheckResults)
                  .slice(0, 5)
                  .map((result) => (
                    <ResultCard>
                      <Text>{result}</Text>
                      <ResultValue>
                        <Text>{skillCheckResults[result].p_target}</Text>
                      </ResultValue>
                    </ResultCard>
                  ))}
            </ResultsSection>
            <ResultsSection>
              {skillCheckResults &&
                Object.keys(skillCheckResults)
                  .slice(5, 10)
                  .map((result) => (
                    <ResultCard>
                      <Text>{result}</Text>
                      <ResultValue>
                        <Text>{skillCheckResults[result].p_target}</Text>
                      </ResultValue>
                    </ResultCard>
                  ))}
            </ResultsSection>
          </SkillCheckContent>
        </SkillCheckSection>
      </Container>
    </MainPageContainer>
  );
}
