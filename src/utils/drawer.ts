import { POS_ZANDIS, SPACING } from '~constants';

type DrawObject = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number
) => (() => void)[];

type DrawCallback = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number
) => () => void;

const GRID_SIZE = 10;
const c = (l: number, u: number) =>
  Math.round(Math.random() * (u || 255) + l || 0);

export const drawCube: DrawObject = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number
) => {
  return [
    () => {
      ctx.save();
      ctx.translate(x, y);

      // center face
      ctx.beginPath();
      ctx.moveTo(dx, 0);
      ctx.lineTo(2 * dx, dy);
      ctx.lineTo(dx, 2 * dy);
      ctx.lineTo(0, dy);
      ctx.closePath();
      ctx.fillStyle = '#989865';
      ctx.strokeStyle = '#8e8e5e';
      ctx.stroke();
      ctx.fill();

      // left face
      ctx.beginPath();
      ctx.moveTo(0, dy);
      ctx.lineTo(dx, 2 * dy);
      ctx.lineTo(dx, 2 * dy + h);
      ctx.lineTo(0, dy + h);
      ctx.closePath();
      ctx.fillStyle = '#838357';
      ctx.strokeStyle = '#7a7a51';
      ctx.stroke();
      ctx.fill();

      // left face
      ctx.beginPath();
      ctx.moveTo(dx, 2 * dy);
      ctx.lineTo(2 * dx, dy);
      ctx.lineTo(2 * dx, dy + h);
      ctx.lineTo(dx, 2 * dy + h);
      ctx.closePath();
      ctx.fillStyle = '#6f6f49';
      ctx.strokeStyle = '#676744';
      ctx.stroke();
      ctx.fill();

      ctx.restore();
    },
  ];
};

export const drawGrasses: DrawObject = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number
) => {
  const stack: (() => void)[] = [];
  // const clipBlock: DrawObject = (ctx, x, y, dx, dy, h) => {
  //   const region = new Path2D();
  //   region.moveTo(x - dx, y - h);
  //   region.lineTo(x + 3 * dx, y - h);
  //   region.lineTo(x + 2 * dx, y + dy);
  //   region.lineTo(x + dx, y + 2 * dy);
  //   region.lineTo(x, y + dy);
  //   region.lineTo(x, y + dy);
  //   region.closePath();
  //   ctx.clip(region);
  // };
  const drawGrass: DrawCallback = (ctx, x, y, dx, dy, h) => {
    let t = 0;
    const tall = 4 * (Math.random() * 0.4 + 0.6) * h;
    const size = ((Math.random() * 0.4 + 0.6) * dx) / 4;
    const speed = Math.random() * 2;

    const color =
      'rgb(' + c(60, 10) + ',' + c(201, 50) + ',' + c(120, 50) + ')';

    return () => {
      const deviation = Math.cos(t / 50) * Math.min(t / 20, dx);
      t += speed;
      // console.log('t: ', t);

      ctx.save();
      ctx.translate(x + dx, y + dy);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.lineTo(-size, 0);
      ctx.quadraticCurveTo(-size, -tall / 2, deviation, -tall);
      ctx.quadraticCurveTo(size, -tall / 2, size, 0);
      ctx.fill();
      ctx.restore();
    };
  };

  POS_ZANDIS[parseInt('' + Math.random() * 2, 10)].forEach((posZandi) => {
    console.log('pos: ', posZandi);
    // ctx.save();
    // ctx.translate(x, y);
    // clipBlock(ctx, 0, 0, dx, dy, h);
    stack.push(drawGrass(ctx, x + posZandi[0], y + posZandi[1], dx, dy, h));
    // ctx.restore();
  });

  return stack;
};

// const drawGrasses: DrawObject = (ctx, x, y, dx, dy, h) => {
//   POS_ZANDIS[parseInt('' + Math.random() * 2, 10)].forEach((posZandi) => {
//     stackDrawingObject.push(
//       drawGrass(ctx, x + posZandi[0], y + posZandi[1], dx, dy, h)
//     );
//   });
// };

export const drawRectS: DrawObject = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number
) => {
  return [
    () => {
      ctx.save();
      ctx.fillStyle = 'red';
      ctx.fillRect(x, y, dx, dy);
      console.log('x: ', x, 'y: ', y);
      ctx.translate(x, y);

      const tileX = dx / 8;

      for (let i = 0; i < 20; i++) {
        const px = Math.random() * (dx - tileX),
          py = Math.random() * (dy - tileX);
        const color =
          'rgb(' + c(120, 120) + ',' + c(120, 120) + ',' + c(120, 120) + ')';
        ctx.save();
        ctx.translate(px, py);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, tileX, tileX);
        ctx.restore();
      }
      ctx.restore();
    },
  ];
};

export const draw = (
  ctx: CanvasRenderingContext2D,
  currentRef: HTMLCanvasElement,
  dataChunks: number[][],
  drawingType: 'box' | 'grass'
) => {
  const drawObject = drawingType === 'box' ? drawCube : drawGrasses;

  ctx.clearRect(0, 0, currentRef.width, currentRef.height);
  ctx.fillStyle = 'transparent';
  // ctx.fillStyle = drawingType === 'box' ? '#abdcab' : 'transparent';
  ctx.fillRect(0, 0, currentRef.width, currentRef.height);
  ctx.scale(1, 1);
  ctx.lineJoin = 'round';
  ctx.save();

  return () => {
    console.log('running: ', currentRef);

    const H = drawingType === 'box' ? 5 : 15;
    const DX = 2 * (GRID_SIZE + SPACING),
      DY = GRID_SIZE + SPACING;
    const x0 = currentRef.width / 2 + 6 * DX;
    const y0 = currentRef.height / 4 + 6 * DY;

    console.log('xo: ', x0, y0);

    // drawGrasses(ctx, 50, 50, 50, 200, 100);
    drawingType === 'box' && drawRectS(ctx, 50, 50, 100, 50, 100);

    dataChunks.map((contributes, y) =>
      contributes.map((_, x) =>
        drawObject(
          ctx,
          x0 - x * DX - y * DX,
          y0 + y * DY - x * DY,
          2 * GRID_SIZE,
          GRID_SIZE,
          H
        )
      )
    );
    ctx.restore();
  };
};

export const drawTest = (
  ctx: CanvasRenderingContext2D,
  currentRef: HTMLCanvasElement,
  dataChunks: number[][],
  drawingType: 'box' | 'grass'
) => {
  const drawObject = drawingType === 'box' ? drawCube : drawGrasses;
  const stackDrawingObject: any[] = [];
  const H = drawingType === 'box' ? 5 : 15;
  const DX = 2 * (GRID_SIZE + SPACING),
    DY = GRID_SIZE + SPACING;
  const x0 = currentRef.width / 2 + 6 * DX;
  const y0 = currentRef.height / 4 + 6 * DY;

  ctx.lineJoin = 'round';
  ctx.fillStyle = 'transparent';
  ctx.scale(1, 1);

  const render = () => {
    ctx.clearRect(0, 0, currentRef.width, currentRef.height);
    ctx.fillRect(0, 0, currentRef.width, currentRef.height);
    stackDrawingObject.forEach((drawObject) => drawObject());

    drawingType === 'grass' && requestAnimationFrame(render);
  };

  dataChunks.map((contributes, y) =>
    contributes.map((_, x) =>
      stackDrawingObject.push(
        ...drawObject(
          ctx,
          x0 - (x + y) * DX,
          y0 + (y - x) * DY,
          2 * GRID_SIZE,
          GRID_SIZE,
          H
        )
      )
    )
  );

  render();
};
