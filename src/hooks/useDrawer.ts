import React, { useEffect, useRef, useState } from 'react';
import { draw } from '~utils/drawer';

export default (
  drawingType: 'box' | 'grass'
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

    const test = (currentRef: HTMLCanvasElement) => {
      requestAnimationFrame(draw(ctx, currentRef, dataChunks, drawingType));
    };

    test(ref.current);
  }, [dataChunks]);

  return [ref, updateDrawer];
};
