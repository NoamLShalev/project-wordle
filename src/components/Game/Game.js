import React from "react";
import GuessInput from "../GuessInput";
import Guesses from "../Guesses";
import WonBanner from "../WonBanner";
import LostBanner from "../LostBanner";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState("running");

  const handleAddGuess = (guess) => {
    setGuesses([...guesses, guess]);
    if (guess === answer) {
      setGameStatus("won");
    } else if (guesses.length + 1 >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  };

  return (
    <>
      <Guesses guesses={guesses} answer={answer} />
      <GuessInput handleAddGuess={handleAddGuess} gameStatus={gameStatus} />
      {gameStatus === "won" && <WonBanner numOfGuesses={guesses.length} />}
      {gameStatus === "lost" && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;
