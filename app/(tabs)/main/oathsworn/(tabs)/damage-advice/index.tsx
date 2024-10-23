import { AnimatedPressable } from "@/components/pressable";
import { ColoredText, Text } from "@/components/text/text";
import { ValueWithToggle } from "@/components/view";
import { IterationSet, NUM_OF_CARDS } from "@/constants/model";
import {
  BasicScrollView,
  CenteredView,
  Color,
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
import { ImageBackground } from "react-native";
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

    const iterationConfig = IterationSet[gameState.config.calculationSpeed];

    const results = p.damageAdvice({
      numOfExtraEmpower: empowerBonus,
      baseMight: might,
      initialTargetedScenarios: NUM_OF_CARDS,
      ...iterationConfig,
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
    <BasicScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={require("@/assets/images/oathsworn-bg.png")}
        imageStyle={{ resizeMode: "cover" }}
        style={{ width: "100%", height: "100%" }}
      >
        <CenteredView style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}>
          <DamageAdviceSection>
            <CenteredView style={{ marginBottom: 16 }}>
              <Text.H3 style={{ color: Color.WHITE }}>Damage Advice</Text.H3>
            </CenteredView>
            <ColumnSection>
              <CenteredView>
                <Text.H5 style={{ color: Color.WHITE }}>Set Base Might</Text.H5>
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
                <Text.H5 style={{ color: Color.WHITE }}>
                  Set Empower Bonus
                </Text.H5>
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
                <Text.Body>Calculate</Text.Body>
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
      </ImageBackground>
    </BasicScrollView>
  );
}
