import { AnimatedPressable } from "@/components/pressable";
import { Text } from "@/components/text/text";
import { CardCount } from "@/models/Deck";
import {
    CardCountContainer,
    CardName,
    SeekButton,
} from "./card-and-count-section.styles";

interface Props {
  count: CardCount;
  onPress: (name: string) => void;
  cardName: string;
}

export function DecksCard(props: Props) {
  const { count, onPress, cardName } = props;
  return (
    <AnimatedPressable
      onPress={() => onPress(cardName)}
      Component={SeekButton}
      color="#5e5251"
    >
      <CardCountContainer>
        <Text.BodySmall style={{ color: "#ffffff", fontSize: 12 }}>
          {count[cardName]}
        </Text.BodySmall>
      </CardCountContainer>
      <CardName>
        <Text.Body>{cardName}</Text.Body>
      </CardName>
    </AnimatedPressable>
  );
}
