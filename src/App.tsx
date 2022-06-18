import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useGameState from "./useGameState";

const TILE_MARGIN = 2;
const MARBLE_SIZE = 20;



function getMarbleStyle(
  marblePosition: number,
  tileSize: number,
  rowWidth: number
) {
  const rowCount = Math.floor(marblePosition / 10);
  const colCount = marblePosition % 10;
  const bottom = `${Math.floor(
    rowCount * (tileSize + TILE_MARGIN * 2) + tileSize / 2 - MARBLE_SIZE / 2
  )}px`;
  let leftPx = Math.floor(colCount * (tileSize + TILE_MARGIN * 2));
  if (rowCount % 2 != 0)
    leftPx = rowWidth - leftPx - tileSize / 2 - MARBLE_SIZE / 2;
  else leftPx += tileSize / 2 - MARBLE_SIZE / 2;
  const left = `${leftPx}px`;

  return { bottom, left };
}

// returns size of a tile in px, as it changes with screen size
function getTileSize(boardBody: React.MutableRefObject<HTMLDivElement | null>) {
  if (boardBody.current) {
    const tile = boardBody.current
      .querySelector("#tile-0")
      ?.getBoundingClientRect?.();
    if (tile) {
      return tile.width;
    }
  }
  return 0;
}

function getRowWidth(boardBody: React.MutableRefObject<HTMLDivElement | null>) {
  if (boardBody.current) {
    const row = boardBody.current.children[0];
    if (!row) return 0;
    return row.getBoundingClientRect().width;
  }
  return 0;
}

const BoardRow = ({ rowIdx }: { rowIdx: number }) => {
  const arr = Array.from(Array(10).keys());
  if (rowIdx % 2 != 0) arr.reverse();
  return (
    <div className="boardRow">
      {arr.map((idx) => (
        <div key={idx} id={`tile-${rowIdx * 10 + idx}`} className="boardTile">
          <span className="tileCount">{rowIdx * 10 + idx + 1}</span>
        </div>
      ))}
    </div>
  );
};

function App() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  
  const allRows = Array(10)
    .fill(0)
    .map((_, rowIdx) => <BoardRow key={rowIdx} rowIdx={9 - rowIdx} />);
  const { rollDice, dice, marblePosition, reset } = useGameState();
  console.log({ dice, marblePosition });
  const [marbleStyle, setMarbleStyle] = useState({});

  useEffect(() => {
    if (marblePosition === -1) setMarbleStyle({});
    else {
      const tileSize = getTileSize(boardRef);
      const rowWidth = getRowWidth(boardRef);
      const style = getMarbleStyle(marblePosition, tileSize, rowWidth);
      setMarbleStyle(style);
    }
  }, [marblePosition, boardRef]);

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
      <button className="resetButton" onClick={reset}>Reset Game</button>
    </div>
  );
}

export default App;
