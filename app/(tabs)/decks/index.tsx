import { useGame } from "@/context-providers/game/game-hook";
import { Card } from "@/models/Card";
import {
  StyledView,
  Container,
  StyledButton,
  StyledCard,
} from "./decks.styles";

export default function DecksPage() {
  const { addCard, gameState } = useGame();

  function onPress() {
    return addCard(new Card(1));
  }
  
  return (
    <StyledView>
      <Container>
        <StyledButton title="Add Card" onPress={onPress} />
        {gameState.deck.map((card, i) => (
          <StyledCard key={i}>{card.value}</StyledCard>
        ))}
      </Container>
    </StyledView>
  );
}
