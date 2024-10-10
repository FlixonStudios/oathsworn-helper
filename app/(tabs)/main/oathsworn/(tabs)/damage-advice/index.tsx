import { AnimatedPressable } from "@/components/pressable";
import { ColoredText } from "@/components/text/text";
import { ValueWithToggle } from "@/components/view";
import { NUM_OF_CARDS } from "@/constants/model";
import {
  BasicScrollView,
  CenteredView,
  colorMap,
  ColumnSection,
  SpacedAroundSection,
} from "@/constants/styles";
import { useGame } from "@/context-providers/oathsworn/oathsworn-hook";
import { DeckManager } from "@/models/DecksManager";
import { MightDeck } from "@/models/MightDeck";
import { Probability } from "@/models/Probability";
import { DamageAdvicePerEmpowerCombiResults, Empower } from "@/models/types";
import { useState } from "react";
import { Text } from "react-native";
import { DamageResultRow } from "./components/damage-results-row";
import {
  CalculateButton,
  DamageAdviceSection,
  SeekButton,
} from "./damage-advice.styles";

export default function DamageAdvicePage() {
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
    <BasicScrollView>
      <CenteredView>
        <DamageAdviceSection>
          <CenteredView>
            <Text>Damage Advice</Text>
          </CenteredView>
          <ColumnSection>
            <CenteredView>
              <Text>Set Base Might</Text>
            </CenteredView>
            <SpacedAroundSection>
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
            </SpacedAroundSection>
            <CenteredView>
              <Text>Set Empower Bonus</Text>
            </CenteredView>
            <ValueWithToggle
              decreaseText="<"
              onDecrease={() => onPress(-1)}
              increaseText=">"
              onIncrease={() => onPress(1)}
              value={empowerBonus}
            />
            <AnimatedPressable
              Component={CalculateButton}
              onPress={() => calculate()}
            >
              <Text>Calculate</Text>
            </AnimatedPressable>
            {damageAdviceResults?.map((results, i) => {
              return (
                <DamageResultRow
                  key={i}
                  results={results}
                  empowerCombi={results[0].combination}
                />
              );
            })}
          </ColumnSection>
        </DamageAdviceSection>
      </CenteredView>
    </BasicScrollView>
  );
}
