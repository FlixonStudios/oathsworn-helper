import { useCallback, useContext } from "react";
import { OathswornContext, OathswornDispatchContext } from "./oathsworn-ctx";
import { Deck } from "@/models/Deck";
import { CalculationSpeed } from "./types";

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

  const setCalculationSpeed = useCallback(
    (speed: CalculationSpeed) => {
      dispatch({
        type: "set-calculation-speed",
        payload: speed,
      });
    },
    [dispatch]
  );

  return {
    gameState,
    seekCard,
    revertCard,
    setCalculationSpeed,
  };
};
