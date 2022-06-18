import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import BoardRow from "./components/BoardRow";
import useGameState from "./hooks/useGameState";
import useMarbleStyle from "./hooks/useMarbleStyle";



function App() {
  const boardRef = useRef<HTMLDivElement | null>(null);

  const allRows = Array(10)
    .fill(0)
    .map((_, rowIdx) => <BoardRow key={rowIdx} rowIdx={9 - rowIdx} />);
  const { rollDice, dice, marblePosition, reset } = useGameState();
  const marbleStyle = useMarbleStyle(marblePosition, boardRef);

  return (
    <div className="App">
      <div ref={boardRef} className="boardBody">
        {allRows}
        <div style={marbleStyle} className="marble"></div>
      </div>
      <img
        className="dice"
        src={`/dice-${dice}.png`}
        alt="die"
        onClick={rollDice}
      />
      <button className="resetButton" onClick={reset}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
