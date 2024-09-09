import { NUM_OF_CARDS } from "@/constants/model";
import { colorMap } from "@/constants/styles";
import { useGame } from "@/context-providers/game/game-hook";
import { DeckManager } from "@/models/DecksManager";
import { MightDeck } from "@/models/MightDeck";
import { Optimizer } from "@/models/Optimizer";
import { Probability } from "@/models/Probability";
import { DamageAdvicePerEmpowerCombiResults, Empower } from "@/models/types";
import { useState } from "react";
import { Text } from "react-native";
import { DamageResultRow } from "./components/damage-results-row";
import {
  CalculateButton,
  ChangeTargetButton,
  Container,
  CurrentTarget,
  MainPageContainer,
  MightSection,
  SeekButton,
  SkillCheckContent,
  SkillCheckSection,
  TargetSection,
} from "./damage-advice.styles";
import { ColoredText } from "@/components/text/text";

export default function MainPage() {
  const { gameState } = useGame();

  const [empowerBonus, setEmpowerBonus] = useState(0);
  const [might, setMight] = useState<Empower>({});
  const [damageAdviceResults, setDamageAdviceResults] =
    useState<DamageAdvicePerEmpowerCombiResults[][]>();

  const { decks } = gameState;
  const decksToUse: Array<"1" | "2" | "3"> = ["1", "2", "3"];

  function onPress(val: number) {
    if (val < 0 && empowerBonus === 0) return;
    setEmpowerBonus(empowerBonus + val);
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

    const results = p.damageAdvice({
      numOfExtraEmpower: empowerBonus,
      baseMight: might,
      initialTargetedScenarios: NUM_OF_CARDS,
      iterations: 4000,
    });

    setDamageAdviceResults([...results]);
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
        <SkillCheckSection>
          <Container>
            <Text>Damage Advice</Text>
          </Container>
          <SkillCheckContent>
            <Container>
              <Text>Set Base Might</Text>
            </Container>
            <MightSection>
              {decksToUse.map((i) => {
                return (
                  <SeekButton
                    key={i}
                    style={{ backgroundColor: colorMap[i] }}
                    onPress={() => addMight(i)}
                    onLongPress={() => resetSkill(i)}
                  >
                    <ColoredText text={might[i]} bgColor={colorMap[i]} />
                  </SeekButton>
                );
              })}
            </MightSection>
            <Container>
              <Text>Set Empower Bonus</Text>
            </Container>
            <TargetSection>
              <ChangeTargetButton onPress={() => onPress(-1)}>
                <Text>{"<"}</Text>
              </ChangeTargetButton>
              <CurrentTarget>
                <Text>{empowerBonus}</Text>
              </CurrentTarget>
              <ChangeTargetButton onPress={() => onPress(1)}>
                <Text>{">"}</Text>
              </ChangeTargetButton>
            </TargetSection>
            <CalculateButton onPress={() => calculate()}>
              <Text>Calculate</Text>
            </CalculateButton>
            {damageAdviceResults?.map((results, i) => {
              return (
                <DamageResultRow
                  results={results}
                  empowerCombi={results[0].combination}
                />
              );
            })}
          </SkillCheckContent>
        </SkillCheckSection>
      </Container>
    </MainPageContainer>
  );
}
