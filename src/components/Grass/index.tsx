import React, { useEffect, useRef } from 'react';

import { TestBlock } from './styles';
import { Props } from './types';

const c = (l: number, u: number) =>
  Math.round(Math.random() * (u || 255) + l || 0);

export default ({ ...otherProps }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const canvasBoxRef = useRef<any>();

  useEffect(() => {
    if (!!!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d'),
      stack: any[] = [],
      w = canvasRef.current.clientWidth,
      h = canvasRef.current.clientHeight;

    if (!!!ctx) return;

    const drawGrasses = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, w, h);
      stack.forEach((el) => {
        el();
      });
      requestAnimationFrame(drawGrasses);
    };

    const drawGrass = (): (() => void) => {
      let x = 0,
        y = 0;
      const maxTall = Math.random() * 0.5 * h + h / 2;
      const maxSize = Math.random() * 10 + 10;
      const speed = Math.random() * 2;
      const position = Math.random() * w - w / 2;

      const color =
        'rgb(' + c(60, 10) + ',' + c(201, 50) + ',' + c(120, 50) + ')';

      return (): void => {
        const deviation = Math.cos(x / 50) * Math.min(x / 20, 50),
          tall = Math.min(x / 2, maxTall),
          size = Math.min(x / 10, maxSize);
        x += speed;
        // console.log('x: ', x);

        ctx.save();
        // ctx.strokeWidth = 10;
        ctx.translate(w / 2 + position, h);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.lineTo(-size, 0);
        ctx.quadraticCurveTo(-size, -tall / 2, deviation, -tall);
        ctx.quadraticCurveTo(size, -tall / 2, size, 0);
        ctx.fill();
        ctx.restore();
      };
    };

    for (var t = 0; t < 20; t++) {
      stack.push(drawGrass());
    }

    drawGrasses();
  }, []);

  // useEffect(() => {
  //   if (!!!canvasRef.current) return;
  //   var ctx = canvasBoxRef.current.getContext('2d'),
  //     w = canvasRef.current.width,
  //     h = canvasRef.current.height;

  //   const draw = () => {
  //     ctx.clearRect(0, 0, w, h);

  //     const sizeX = 14 * 3;
  //     const sizeY = 14 * 3;
  //     const sizeZ = 14;

  //     ctx.scale(1, 1);

  //     drawCube(w / 2, h / 2, sizeX, sizeY, sizeZ);
  //   };

  //   requestAnimationFrame(draw);

  //   const drawCube = (
  //     x: number,
  //     y: number,
  //     wx: number,
  //     wy: number,
  //     h: number
  //   ) => {
  //     // left face
  //     ctx.beginPath();
  //     ctx.moveTo(x, y);
  //     ctx.lineTo(x - wx, y - wx * 0.5);
  //     ctx.lineTo(x - wx, y - h - wx * 0.5);
  //     ctx.lineTo(x, y - h * 1);
  //     ctx.closePath();
  //     ctx.fillStyle = '#838357';
  //     ctx.strokeStyle = '#7a7a51';
  //     ctx.stroke();
  //     ctx.fill();

  //     // right face
  //     ctx.beginPath();
  //     ctx.moveTo(x, y);
  //     ctx.lineTo(x + wy, y - wy * 0.5);
  //     ctx.lineTo(x + wy, y - h - wy * 0.5);
  //     ctx.lineTo(x, y - h * 1);
  //     ctx.closePath();
  //     ctx.fillStyle = '#6f6f49';
  //     ctx.strokeStyle = '#676744';
  //     ctx.stroke();
  //     ctx.fill();

  //     // center face
  //     ctx.beginPath();
  //     ctx.moveTo(x, y - h);
  //     ctx.lineTo(x - wx, y - h - wx * 0.5);
  //     ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
  //     ctx.lineTo(x + wy, y - h - wy * 0.5);
  //     ctx.closePath();
  //     ctx.fillStyle = '#989865';
  //     ctx.strokeStyle = '#8e8e5e';
  //     ctx.stroke();
  //     ctx.fill();
  //   };
  // }, []);

  return (
    <TestBlock>
      <canvas id="grass" ref={canvasRef} />
      {/* <canvas id="box" ref={canvasBoxRef} /> */}
    </TestBlock>
  );
};
