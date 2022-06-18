import { useEffect, useState } from "react";

// 0-indexed mapping for snake-head: snake-tail
const SNAKES: { [key: number]: number } = {
  98: 61,
  89: 45,
  11: 8
};
const TRANSITION_DELAY = 1000;

/**
 *
 * @param lockableDice a lock on the rollDice function, which waits for marble movement until next roll is done
 * @returns
 */
export default function useGameState(lockableDice?: boolean) {
  // history of the Game
  let history: { newPosition: number; dice: number }[] = [];
  const [marblePosition, setMarblePosition] = useState({ value: -1 });
  const [dice, setDice] = useState(1);
  const [diceLocked, setDiceLocked] = useState(false);
  // used to trigger useEffect when value of dice is same in consecutive rolls
  // const [seed, setSeed] = useState(new Date());

  /**
   * Roll the dice and update position
   */
  function rollDice() {
    if (lockableDice && diceLocked) return;
    const randomDice = Math.floor(6 * Math.random()) + 1;
    setDice(randomDice);
    // setSeed(new Date());
    updatePosition(randomDice);
    setDiceLocked(true);
    // setSeed(new Date());
  }

  /**
   * Update the marble position whever dice is rolled
   */
  function updatePosition(randomDice: number) {
    let newPosition = marblePosition.value;
    if (marblePosition.value === -1 && randomDice === 6) {
      // setMarblePosition(0);
      newPosition = 0;
    } else if (marblePosition.value > -1) {
      if (marblePosition.value + randomDice < 100)
        newPosition = marblePosition.value + randomDice;
      else newPosition = marblePosition.value;
    }
    setMarblePosition({ value: newPosition });
    history.push({ dice: randomDice, newPosition });
  }

  // check for snakes for new dice position, with a delay
  useEffect(() => {
    const snakeEnd = SNAKES[marblePosition.value];
    if (marblePosition.value > -1) {
      const id = setTimeout(() => {
        if (snakeEnd) setMarblePosition({ value: snakeEnd });
        setDiceLocked(false);
      }, TRANSITION_DELAY);
      return () => clearTimeout(id);
    } else setDiceLocked(false);
  }, [marblePosition, setDiceLocked]);
  console.log(diceLocked);
  /**
   * Reset the game state to starting position
   */
  function reset() {
    setDice(1);
    setMarblePosition({ value: -1 });
  }

  return {
    marblePosition: marblePosition.value,
    rollDice,
    reset,
    dice,
    diceLocked,
  };
}
