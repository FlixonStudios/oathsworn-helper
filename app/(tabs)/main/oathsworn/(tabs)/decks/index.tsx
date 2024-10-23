import { TooltipButton } from "@/components/pressable/TooltipButton";
import { Text } from "@/components/text/text";
import {
  BasicScrollView,
  CenteredRowSection,
  CenteredView,
  Color,
  colorMap,
} from "@/constants/styles";
import { useGame } from "@/context-providers/oathsworn/oathsworn-hook";
import { Deck } from "@/models/Deck";
import { useState } from "react";
import { ImageBackground, View } from "react-native";
import { CardsAndCountArea } from "./components/card-and-count-section";
import { DecksCard } from "./components/decks-card";
import { DeckPairSection, StyledDeck } from "./decks.styles";

export default function DecksPage() {
  const { seekCard, revertCard, gameState } = useGame();
  const [showHelp, setShowHelp] = useState<boolean>(false);

  function onPressSeekCard(name: string, deck: Deck) {
    seekCard(name, deck);
  }

  function onPressRevertCard(name: string, deck: Deck) {
    revertCard(name, deck);
  }

  return (
    <BasicScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={require("@/assets/images/oathsworn-bg.png")}
        imageStyle={{ resizeMode: "cover" }}
        style={{ width: "100%", height: "100%" }}
      >
        <CenteredView
          style={{
            paddingHorizontal: 32,
            paddingVertical: 32,
            backgroundColor: "rgba(0,0,0, 0.5)",
          }}
        >
          <Text.H3 style={{ color: Color.WHITE }}>Decks</Text.H3>
          <View style={{ marginVertical: 24, alignItems: "center" }}>
            <TooltipButton onPress={() => setShowHelp(!showHelp)} />
          </View>
          {showHelp && (
            <CenteredRowSection>
              <DecksCard cardName="2" count={{ "2": 6 }} onPress={() => {}} />
              <View style={{ marginHorizontal: 16, flex: 1 }}>
                <Text.Body style={{ color: Color.WHITE }}>
                  Dark grey value at the top indicates the no. of cards in the
                  deck. The value in white area is the value of the card.
                </Text.Body>
              </View>
            </CenteredRowSection>
          )}
          <DeckPairSection>
            <Text.H5 style={{ color: Color.WHITE }}>Cards in Deck</Text.H5>
            <Text.H5 style={{ color: Color.WHITE }}>Drawn Cards</Text.H5>
          </DeckPairSection>
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
        </CenteredView>
      </ImageBackground>
    </BasicScrollView>
  );
}
