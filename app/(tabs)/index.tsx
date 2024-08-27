import { useGame } from "@/context-providers/game/game-hook";
import { Card } from "@/models/Card";
import { View, Button } from "react-native";
import styled from "styled-components";

export default function Index() {
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

const StyledButton = styled(Button)`
  type: button;
  height: 2rem;
`;

const Container = styled.div`
  display: flex;
`;

const StyledView = styled(View)`
  flex: 1;
  justifycontent: "center";
  alignitems: "center";
`;

const StyledCard = styled.div`
  height: 3rem;
  width: 3rem;
`;
