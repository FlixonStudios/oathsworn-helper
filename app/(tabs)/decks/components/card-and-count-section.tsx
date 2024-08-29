import { CardCount, Deck } from "@/models/Deck";
import { Text } from "react-native";
import {
  CardName,
  CardsAndCountSection,
  CountText,
  SeekButton,
} from "./card-and-count-section.styles";
import { useGame } from "@/context-providers/game/game-hook";

interface Props {
  deck: Deck;
  count: CardCount;
  onPress: (name: string) => void
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
            <SeekButton key={i} onPress={() => onPress(cardName)}>
              <CountText>{count[cardName]}</CountText>
              <CardName>
                <Text>{cardName}</Text>
              </CardName>
            </SeekButton>
          );
        })}
    </CardsAndCountSection>
  );
}
