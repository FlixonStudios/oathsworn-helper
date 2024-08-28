import { useGame } from "@/context-providers/game/game-hook";
import { Card } from "@/models/Card";
import {
  StyledView,
  Container,
  StyledButton,
  StyledDeck,
  DeckSection,
} from "./decks.styles";

export default function DecksPage() {
  const { addCard, gameState } = useGame();

  const colorMap = ["#ffffff", "#e8eb34", "#eb4334", "#000000"];

  function onPress() {
    return addCard(new Card(1));
  }
  return (
    <StyledView>
      <Container>
        <StyledButton title="Add Card" onPress={onPress} />
        {gameState.decks.map((deck, i) => {
          return (
            <DeckSection key={i}>
              <StyledDeck style={{ backgroundColor: colorMap[i] }} />
            </DeckSection>
          );
        })}
      </Container>
    </StyledView>
  );
}
