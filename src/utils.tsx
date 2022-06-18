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

export { getRowWidth, getMarbleStyle, getTileSize };
