import { BasicScrollView, colorMap } from "@/constants/styles";
import { useGame } from "@/context-providers/oathsworn/oathsworn-hook";
import { Deck } from "@/models/Deck";
import { ImageBackground } from "react-native";
import { CardsAndCountArea } from "./components/card-and-count-section";
import { DeckPairSection, StyledDeck } from "./decks.styles";

export default function DecksPage() {
  const { seekCard, revertCard, gameState } = useGame();

  function onPressSeekCard(name: string, deck: Deck) {
    seekCard(name, deck);
  }

  function onPressRevertCard(name: string, deck: Deck) {
    revertCard(name, deck);
  }

  return (
    <BasicScrollView contentContainerStyle={{ display: "flex", flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/oathsworn-bg.png")}
        imageStyle={{ resizeMode: "cover", height: "100%" }}
        style={{ flex: 1 }}
      >
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
      </ImageBackground>
    </BasicScrollView>
  );
}
