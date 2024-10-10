import { useGame } from "@/context-providers/game/game-hook";
import { StyledDeck, DeckPairSection } from "./decks.styles";
import { CardsAndCountArea } from "./components/card-and-count-section";
import { Deck } from "@/models/Deck";
import { BasicScrollView, colorMap } from "@/constants/styles";

export default function DecksPage() {
  const { seekCard, revertCard, gameState } = useGame();

  function onPressSeekCard(name: string, deck: Deck) {
    seekCard(name, deck);
  }

  function onPressRevertCard(name: string, deck: Deck) {
    revertCard(name, deck);
  }

  return (
    <BasicScrollView>
      {gameState.decks.map((deck, i) => {
        const count = deck.getDeckCardCount();
        return (
          <DeckPairSection key={i}>
            <StyledDeck style={{ backgroundColor: colorMap[i] }}>
              <CardsAndCountArea
                onPress={(name: string) => onPressSeekCard(name, deck)}
                deck={deck}
                count={count.remaining}
              />
            </StyledDeck>
            <StyledDeck style={{ backgroundColor: colorMap[i] }}>
              <CardsAndCountArea
                onPress={(name: string) => onPressRevertCard(name, deck)}
                deck={deck}
                count={count.drawn}
              />
            </StyledDeck>
          </DeckPairSection>
        );
      })}
    </BasicScrollView>
  );
}
