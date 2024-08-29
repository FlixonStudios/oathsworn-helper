import { useGame } from "@/context-providers/game/game-hook";
import { Card } from "@/models/Card";
import { DecksContainer, StyledDeck, DeckPairSection } from "./decks.styles";
import { CardsAndCountArea } from "./components/card-and-count-section";

export default function DecksPage() {
  const { addCard, gameState } = useGame();

  const colorMap = ["#ffffff", "#e8eb34", "#eb4334", "#000000"];

  function onPress() {
    return addCard(new Card(1));
  }

  return (
    <DecksContainer>
      {gameState.decks.map((deck, i) => {
        const count = deck.getDeckCardCount();
        return (
          <DeckPairSection key={i}>
            <StyledDeck style={{ backgroundColor: colorMap[i] }}>
              <CardsAndCountArea deck={deck} count={count.remaining} />
            </StyledDeck>
            <StyledDeck style={{ backgroundColor: colorMap[i] }}>
              <CardsAndCountArea deck={deck} count={count.drawn} />
            </StyledDeck>
          </DeckPairSection>
        );
      })}
    </DecksContainer>
  );
}
