import { CardCount, Deck } from "@/models/Deck";
import {
  CardsAndCountSection
} from "./card-and-count-section.styles";
import { DecksCard } from "./decks-card";

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
            <DecksCard
              key={i}
              onPress={onPress}
              count={count}
              cardName={cardName}
            />
          );
        })}
    </CardsAndCountSection>
  );
}
