import React, { useEffect, useRef } from 'react';
import { SPACING } from '~constants';

import Grass from '../Grass';

import { MainBlock } from './styles';
import { Props } from './types';

export default ({ id, x, y, dx, dy, style, ...otherProps }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!!!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d'),
      w = canvasRef.current.clientWidth,
      h = canvasRef.current.clientHeight;

    canvasRef.current.width = w;
    canvasRef.current.height = h;

    if (!!!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const sizeX = 14 * 3;
      const sizeY = 14 * 3;
      const sizeZ = 10;

      ctx.scale(1, 1);
      ctx.lineJoin = 'round';

      drawCube(0, h / 2 - sizeZ, w / 2, h / 4, sizeZ);
    };

    requestAnimationFrame(draw);

    const drawCube = (
      x: number,
      y: number,
      dx: number,
      dy: number,
      h: number
    ) => {
      // center face
      ctx.beginPath();
      ctx.moveTo(x + dx, y);
      ctx.lineTo(x + 2 * dx, y + dy);
      ctx.lineTo(x + dx, y + 2 * dy);
      ctx.lineTo(x, y + dy);
      ctx.closePath();
      ctx.fillStyle = '#989865';
      ctx.strokeStyle = '#8e8e5e';
      ctx.stroke();
      ctx.fill();

      // left face
      ctx.beginPath();
      ctx.moveTo(x, y + dy);
      ctx.lineTo(x + dx, y + 2 * dy);
      ctx.lineTo(x + dx, y + 2 * dy + h);
      ctx.lineTo(x, y + dy + h);
      ctx.closePath();
      ctx.fillStyle = '#838357';
      ctx.strokeStyle = '#7a7a51';
      ctx.stroke();
      ctx.fill();

      // left face
      ctx.beginPath();
      ctx.moveTo(x + dx, y + 2 * dy);
      ctx.lineTo(x + 2 * dx, y + dy);
      ctx.lineTo(x + 2 * dx, y + dy + h);
      ctx.lineTo(x + dx, y + 2 * dy + h);
      ctx.closePath();
      ctx.fillStyle = '#6f6f49';
      ctx.strokeStyle = '#676744';
      ctx.stroke();
      ctx.fill();
    };
  }, []);

  return (
    <MainBlock
      id={id}
      style={{
        ...style,
        marginTop: (x * (dy + SPACING)) / 2 + (y * (dy + SPACING)) / 2,
        marginLeft: -0.7 * dx,
        // marginLeft: (-x * dx) / 2,
      }}
      {...otherProps}
    >
      <Grass />
      <canvas
        id="test"
        ref={canvasRef}
        style={{
          width: dx * 2,
          height: dy * 2,
          marginTop: -dy / 2,
        }}
      />
    </MainBlock>
  );
};
