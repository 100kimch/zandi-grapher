import { SPACING } from '~constants';

type DrawObject = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number
) => void;

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

export const drawGrasses: DrawObject = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number
) => {
  const drawGrass: DrawObject = (ctx, x, y, dx, dy, h) => {
    const maxTall = Math.random() * 0.5 * dy + dy / 2;
    const maxSize = Math.random() * 10;
    const speed = Math.random() * 2;
    const position = Math.random() * dx - dx / 2;

    const color =
      'rgb(' + c(60, 10) + ',' + c(201, 50) + ',' + c(120, 50) + ')';
    const deviation = Math.cos(dx / 50) * Math.min(dx / 20, 50),
      tall = Math.min(dy / 2, maxTall),
      size = Math.min(dx / 5, maxSize);
    x += speed;
    ctx.translate(dx / 2 + position, h);
    // ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.lineTo(-size, 0);
    ctx.quadraticCurveTo(-size, -tall / 2, deviation, -tall);
    ctx.quadraticCurveTo(size, -tall / 2, size, 0);
    ctx.fill();
  };
  // ctx.clearRect(x, y, x + 2 * dx, y + 2 * dy);
  // ctx.fillStyle = 'red';
  // ctx.fillRect(x, y, 100, y + 2 * dy);

  for (let i = 0; i < 20; i++) {
    const px = x + Math.random() * dx * 2 - dx / 2,
      py = y + Math.random() * dy * 2 - dy / 2 - h;

    ctx.save();
    const region = new Path2D();
    region.moveTo(x - dx, y - h);
    region.lineTo(x + 3 * dx, y - h);
    region.lineTo(x + 2 * dx, y + dy);
    region.lineTo(x + dx, y + 2 * dy);
    region.lineTo(x, y + dy);
    region.lineTo(x, y + dy);
    // region.moveTo(0, 0);
    // region.lineTo(2 * dx, dy);
    // region.lineTo(dx, 2 * dy);
    // region.lineTo(0, dy);
    region.closePath();
    // region.rect(-100, 400, 1000, 1000);

    ctx.fillStyle = 'blue';
    ctx.clip(region);

    ctx.translate(px, py);
    drawGrass(ctx, 0, 0, 20, 80, h);
    ctx.restore();
  }
};

export const drawRectS: DrawObject = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number
) => {
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

    const H = drawingType === 'box' ? 5 : 50;
    const DX = 2 * (GRID_SIZE + SPACING),
      DY = GRID_SIZE + SPACING;
    const x0 = currentRef.width / 2 + 6 * DX;
    const y0 = currentRef.height / 4 + 6 * DY;

    console.log('xo: ', x0, y0);

    // drawGrasses(ctx, 50, 50, 50, 200, 100);
    drawRectS(ctx, 50, 50, 100, 50, 100);

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
