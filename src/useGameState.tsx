import { useEffect, useState } from "react";

export default function useGameState() {
    // history of the Game
    let history = [];
    const [marblePosition, setMarblePosition] = useState(-1);
    const [dice, setDice] = useState(1);
    const [seed, setSeed] = useState(new Date());
    /**
     * Roll the dice
     */
    function rollDice() {
      const randomDice = Math.floor(6 * Math.random()) + 1;
      setDice(randomDice);
      setSeed(new Date());
    }
  
    /**
     * Update the marble position whever dice is rolled
     */
    useEffect(() => {
      let newPosition = marblePosition;
      if (marblePosition === -1 && dice === 6) {
        // setMarblePosition(0);
        newPosition = 0;
      } else if (marblePosition > -1) {
        if (marblePosition + dice < 100) newPosition = marblePosition + dice;
        else newPosition = marblePosition;
      }
      setMarblePosition(newPosition);
      history.push({ dice, newPosition });
    }, [dice, setMarblePosition, seed]);
  
    /**
     * Reset the game state to starting position
     */
    function reset() {
      setDice(1);
      setMarblePosition(-1);
    }
  
    return { marblePosition, rollDice, reset, dice };
  }