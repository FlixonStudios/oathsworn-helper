import { Card } from "@/models/Card";
import { useContext } from "react";
import { GameContext, GameDispatchContext } from "./game-ctx";

export const useGame = () => {
  const gameState = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);

  const addCard = (payload: Card) => {
    dispatch({
      type: "add-card",
      payload,
    });
  };

  return {
    gameState,
    addCard,
  };
};
