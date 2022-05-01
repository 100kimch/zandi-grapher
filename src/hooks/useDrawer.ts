import React, { useEffect, useRef, useState } from 'react';
import { renderLegend, renderObject } from '~utils/drawer';

export default (
  drawingType: 'legend' | 'box' | 'grass'
): [
  React.RefObject<HTMLCanvasElement>,
  React.Dispatch<React.SetStateAction<number[][]>>
] => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [dataChunks, updateDrawer] = useState<number[][]>([]);

  useEffect(() => {
    if (ref.current === null) return;
    const ctx = ref.current.getContext('2d');
    if (ctx === null) return;

    ref.current.width = ref.current.clientWidth;
    ref.current.height = ref.current.clientHeight;

    if (drawingType === 'legend') {
      renderLegend(ctx, ref.current, dataChunks, ['day', 'month']);
    } else {
      renderObject(ctx, ref.current, dataChunks, drawingType);
    }
  }, [dataChunks]);

  return [ref, updateDrawer];
};
