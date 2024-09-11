import { Deck, CardCount } from "@/models/Deck";
import { Text } from "react-native";
import {
  CardCountContainer,
  CardName,
  CardsAndCountSection,
  CountText,
  SeekButton,
} from "./card-and-count-section.styles";
import { AnimatedPressable } from "@/components/pressable";

interface Props {
  deck: Deck;
  count: CardCount;
  onPress: (name: string) => void;
}

export function CardsAndCountArea(props: Props) {
  const { deck, count, onPress } = props;

  const uniqueCards = deck.getUniqueCardList();

  return (
    <CardsAndCountSection>
      {uniqueCards
        .filter((cardName) => !!count[cardName])
        .map((cardName, i) => {
          return (
            <AnimatedPressable
              key={i}
              onPress={() => onPress(cardName)}
              Component={SeekButton}
              color="#5e5251"
            >
              <CardCountContainer>
                <CountText>{count[cardName]}</CountText>
              </CardCountContainer>
              <CardName>
                <Text>{cardName}</Text>
              </CardName>
            </AnimatedPressable>
          );
        })}
    </CardsAndCountSection>
  );
}
