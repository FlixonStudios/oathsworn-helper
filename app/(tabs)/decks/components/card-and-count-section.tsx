import { CardCount, Deck } from "@/models/Deck";
import { Text } from "react-native";
import {
  CardName,
  CardsAndCountSection,
  CountText,
  SeekButton,
} from "./card-and-count-section.styles";

interface Props {
  deck: Deck;
  count: CardCount;
}

export function CardsAndCountArea(props: Props) {
  const { deck, count } = props;

  const uniqueCards = deck.getUniqueCardList();

  return (
    <CardsAndCountSection>
      {uniqueCards
        .filter((cardName) => !!count[cardName])
        .map((cardName, i) => {
          return (
            <SeekButton key={i}>
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
