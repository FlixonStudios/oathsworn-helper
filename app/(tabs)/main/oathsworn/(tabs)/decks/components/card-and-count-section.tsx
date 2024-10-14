import { AnimatedPressable } from "@/components/pressable";
import { Text } from "@/components/text/text";
import { CardCount, Deck } from "@/models/Deck";
import {
  CardCountContainer,
  CardName,
  CardsAndCountSection,
  SeekButton
} from "./card-and-count-section.styles";

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
                <Text.Body style={{ color: "#ffffff" }}>
                  {count[cardName]}
                </Text.Body>
              </CardCountContainer>
              <CardName>
                <Text.Body>{cardName}</Text.Body>
              </CardName>
            </AnimatedPressable>
          );
        })}
    </CardsAndCountSection>
  );
}
