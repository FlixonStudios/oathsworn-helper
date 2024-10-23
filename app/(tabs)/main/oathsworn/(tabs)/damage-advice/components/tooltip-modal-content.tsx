import { ColoredText, Text } from "@/components/text/text";
import { ValueWithToggle } from "@/components/view";
import {
    ChangeValueButton,
    Color,
    colorMap,
    ModalStyledSection,
    ModalStyledView,
    SpacedAroundSection,
} from "@/constants/styles";
import { Empower } from "@/models/types";
import { SeekButton } from "../damage-advice.styles";
import { DamageResultRow } from "./damage-results-row";

export function DamageAdviceTooltipModalContent() {
  const decksToUse: Array<"1" | "2" | "3"> = ["1", "2", "3"];
  const might: Empower = {
    "1": 0,
    "2": 1,
    "3": 2,
  };
  const sampleResults = [
    { combination: might, missChance: 0.64, averageDamage: 4, cardsToDraw: 3 },
  ];
  return (
    <ModalStyledView style={{ backgroundColor: Color.WHITE, padding: 24 }}>
      <ModalStyledSection>
        <Text.H5>This is the Damage Advice Section</Text.H5>
      </ModalStyledSection>
      <ModalStyledSection>
        <Text.Body>
          In Oathsworn, when performing an attack, players can decide Empower
          their attacks and decide how many cards to draw to match that value.
        </Text.Body>
      </ModalStyledSection>
      <ModalStyledSection>
        <Text.Body>
          {
            "Having 1 Empower allows the player to upgrade 1 card draw by 1 level (white -> yellow => red -> black). Upgrading 1 card from white to yellow requires 1 Empower. Upgrading 1 card from yellow to black requires 2 Empower. Players can decide use their Empower bonus to draw from any combination of decks."
          }
        </Text.Body>
      </ModalStyledSection>
      <ModalStyledSection>
        <Text.H5>Empower toggle</Text.H5>
        <ValueWithToggle
          increaseText=">"
          decreaseText="<"
          onDecrease={() => {}}
          onIncrease={() => {}}
          value={0}
        />
        <Text.Body>
          {"Use the following  "}
          <ChangeValueButton style={{ marginHorizontal: 4 }}>
            <Text.Body>{"<"}</Text.Body>
          </ChangeValueButton>
          {"  (decrease) and  "}
          <ChangeValueButton style={{ marginHorizontal: 4 }}>
            <Text.Body>{">"}</Text.Body>
          </ChangeValueButton>
          <Text.Body>
            {
              "  (increase) buttons to set the Empower bonus. Value cannot be lower than 0."
            }
          </Text.Body>
        </Text.Body>
      </ModalStyledSection>
      <ModalStyledSection>
        <Text.H5>Base Might</Text.H5>
      </ModalStyledSection>
      <ModalStyledSection>
        <Text.Body>
          {
            "In Oathsworn, players are allowed to draw from 4 different decks - white, yellow, red, black (in ascending order of average card value)."
          }
        </Text.Body>
      </ModalStyledSection>
      <ModalStyledSection>
        <Text.Body>
          {
            "Players will sometimes have improvements allowing them to draw from yellow, red, black decks (white is not limited) even without any Empower."
          }
        </Text.Body>
      </ModalStyledSection>
      <SpacedAroundSection>
        {decksToUse.map((i) => {
          return (
            <SeekButton key={i} style={{ backgroundColor: colorMap[i] }}>
              <ColoredText bgColor={colorMap[i]} text={might[i]} />
            </SeekButton>
          );
        })}
      </SpacedAroundSection>
      <ModalStyledSection>
        <Text.Body>
          Press to increment the allowable cards to draw from the respective
          deck. Long Press to reset to 0.
        </Text.Body>
      </ModalStyledSection>
      <ModalStyledSection>
        <Text.H5>Results</Text.H5>
      </ModalStyledSection>
      <ModalStyledSection>
        <DamageResultRow
          results={sampleResults}
          empowerCombi={sampleResults[0].combination}
          color={Color.DARK_BLUE}
        />
      </ModalStyledSection>
      <ModalStyledSection>
        <Text.Body>
          {
            "On the left, the color denote the decks and the number denote the number of cards drawn from each of them. This is the combination of Empower used for results in this row."
          }
        </Text.Body>
      </ModalStyledSection>
      <ModalStyledSection>
        <Text.Body>
          {
            "On the right, the top value denotes the no. of cards to draw. The middle value denotes the average damage. The bottom value denotes the attack will Miss, dealing 0 damage."
          }
        </Text.Body>
      </ModalStyledSection>
    </ModalStyledView>
  );
}
