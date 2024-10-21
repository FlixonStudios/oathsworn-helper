import { ColoredText, Text } from "@/components/text/text";
import { ValueWithToggle } from "@/components/view";
import {
  ModalStyledView,
  Color,
  BasicScrollView,
  ModalStyledSection,
  ChangeValueButton,
  colorMap,
} from "@/constants/styles";
import { MightSection, SeekButton } from "../skill-check.styles";
import { ResultsSection } from "./results-section";
import { Empower } from "@/models/types";

export function SkillCheckTooltipModalContent() {
  const sampleResults = [
    { cardsToDraw: 4, p_target: 0.5546 },
    { cardsToDraw: 5, p_target: 0.446 },
    { cardsToDraw: 3, p_target: 0.4438 },
    { cardsToDraw: 6, p_target: 0.3084 },
  ];
  const decksToUse: Array<"1" | "2" | "3"> = ["1", "2", "3"];
  const might: Empower = {
    "1": 0,
    "2": 1,
    "3": 2,
  };
  return (
    <ModalStyledView style={{ backgroundColor: Color.WHITE, padding: 32 }}>
      <BasicScrollView>
        <ModalStyledSection>
          <Text.Body>This is the Skill Check Section</Text.Body>
        </ModalStyledSection>
        <ModalStyledSection>
          <Text.Body>
            In Oathsworn, during a Skill Check, players are given a value to
            match. They then decide how many cards to draw to match that value.
          </Text.Body>
        </ModalStyledSection>
        <ModalStyledSection>
          <Text.Body>Skill Check toggle</Text.Body>
          <ValueWithToggle
            increaseText=">"
            decreaseText="<"
            onDecrease={() => {}}
            onIncrease={() => {}}
            value={0}
          />
          <Text.Body>
            Use the following
            <ChangeValueButton style={{ marginHorizontal: 4 }}>
              <Text.Body>{"<"}</Text.Body>
            </ChangeValueButton>
            {"(decrease) and"}
            <ChangeValueButton style={{ marginHorizontal: 4 }}>
              <Text.Body>{">"}</Text.Body>
            </ChangeValueButton>
            <Text.Body>
              {
                "(increase) buttons to set what is the value to match for the Skill Check. You cannot set a value lower than 0."
              }
            </Text.Body>
          </Text.Body>
        </ModalStyledSection>
        <ModalStyledSection>
          <Text.Body>Base Might</Text.Body>
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
              "Players will sometimes have improvements allowing them to draw from yellow, red, black deck (white is not limited)"
            }
          </Text.Body>
        </ModalStyledSection>
        <MightSection>
          {decksToUse.map((i) => {
            return (
              <SeekButton key={i} style={{ backgroundColor: colorMap[i] }}>
                <ColoredText bgColor={colorMap[i]} text={might[i]} />
              </SeekButton>
            );
          })}
        </MightSection>
        <ModalStyledSection>
          <Text.Body>
            Press to increment the allowable cards to draw from the respective
            deck. Long Press to reset to 0.
          </Text.Body>
        </ModalStyledSection>
        <ModalStyledSection>
          <Text.Body>Results</Text.Body>
        </ModalStyledSection>
        <ModalStyledSection>
          <ResultsSection results={sampleResults} color={Color.DARK_BLUE} />
        </ModalStyledSection>
        <ModalStyledSection>
          <Text.Body>
            {
              "The top value denotes the no. of cards to draw. The bottom value denotes the probability to pass the Skill Check (match the value)"
            }
          </Text.Body>
        </ModalStyledSection>
      </BasicScrollView>
    </ModalStyledView>
  );
}
