import { useGame } from "@/context-providers/game/game-hook";
import { DecksContainer, StyledDeck, DeckPairSection } from "./decks.styles";
import { CardsAndCountArea } from "./components/card-and-count-section";
import { Deck } from "@/models/Deck";

export default function DecksPage() {
  const { seekCard, revertCard, gameState } = useGame();

  const colorMap = ["#ffffff", "#e8eb34", "#eb4334", "#000000"];

  function onPressSeekCard(name: string, deck: Deck) {
    seekCard(name, deck);
  }

  function onPressRevertCard(name: string, deck: Deck) {
    revertCard(name, deck);
  }

  return (
    <DecksContainer>
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
    </DecksContainer>
  );
}
