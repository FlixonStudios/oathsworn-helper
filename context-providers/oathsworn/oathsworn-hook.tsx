import { useCallback, useContext } from "react";
import { OathswornContext, OathswornDispatchContext } from "./oathsworn-ctx";
import { Deck } from "@/models/Deck";

export const useGame = () => {
  const gameState = useContext(OathswornContext);
  const dispatch = useContext(OathswornDispatchContext);

  const seekCard = useCallback(
    (name: string, deck: Deck) => {
      deck.seek(name);
      dispatch({
        type: "seek-card",
        payload: deck,
      });
    },
    [dispatch]
  );

  const revertCard = useCallback(
    (name: string, deck: Deck) => {
      deck.revert(name);
      dispatch({
        type: "revert-card",
        payload: deck,
      });
    },
    [dispatch]
  );

  return {
    gameState,
    seekCard,
    revertCard,
  };
};
