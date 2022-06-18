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

export default BoardRow;
