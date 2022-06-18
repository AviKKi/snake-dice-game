import { useEffect, useState } from "react";
import { getMarbleStyle, getRowWidth, getTileSize } from "../utils";

const useMarbleStyle = (
  marblePosition: number,
  boardRef: React.MutableRefObject<HTMLDivElement | null>
) => {
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
  return marbleStyle;
};

export default useMarbleStyle;
