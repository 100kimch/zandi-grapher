import { DAYS, POS_ZANDIS, SPACING } from '~constants';

type Value =
  | {
      text: string;
      color?: never;
    }
  | {
      text?: never;
      color: string;
    };

type DrawObject = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number,
  value?: Value
) => (() => void)[];

type DrawCallback = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number,
  value?: Value
) => () => void;

const GRID_SIZE = 10;
const DX = 2 * (GRID_SIZE + SPACING);
const DY = GRID_SIZE + SPACING;
const c = (l: number, u: number) =>
  Math.round(Math.random() * (u || 255) + l || 0);

export const drawCube: DrawObject = (ctx, x, y, dx, dy, h) => [
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

export const drawGrasses: DrawObject = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  h: number
) => {
  const stack: (() => void)[] = [];
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
    stack.push(drawGrass(ctx, x + posZandi[0], y + posZandi[1], dx, dy, h));
  });

  return stack;
};

export const drawMonthText: DrawObject = (ctx, x, y, dx, dy, h, data) => [
  () => {
    ctx.save();
    ctx.translate(x, y);
    ctx.textAlign = 'left';
    ctx.font = dx + 'px non-serif';
    ctx.fillStyle = 'rgb(40, 60, 50)';
    const cos = Math.cos(Math.PI / 6);
    const sin = Math.sin(Math.PI / 6);
    ctx.transform(1, 0.5, -1, 0.5, 0, 0);
    ctx.scale(1, 0.75);
    ctx.fillText(!!data ? data.text + '월' : '', dx, dy * 2);
    ctx.restore();
  },
];

export const drawDayText: DrawObject = (ctx, x, y, dx, dy, h, data) => [
  () => {
    ctx.save();
    ctx.translate(x, y);
    ctx.textAlign = 'left';
    ctx.font = dx + 'px non-serif';
    ctx.fillStyle = 'rgb(40, 60, 50)';
    const cos = Math.cos(Math.PI / 6);
    const sin = Math.sin(Math.PI / 6);
    ctx.transform(1, 0.5, -1, 0.5, 0, 0);
    ctx.fillText(!!data ? data.text ?? '' : '', dx, dy * 2);
    ctx.restore();
  },
];

export const drawRectS: DrawObject = (ctx, x, y, dx, dy, h) => {
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

export const renderLegend = (
  ctx: CanvasRenderingContext2D,
  currentRef: HTMLCanvasElement,
  dataChunks: number[][],
  drawingType: ('day' | 'month')[]
) => {
  const stackDrawingObject: any[] = [];
  const length = dataChunks.length;
  const x0 = currentRef.width / 2 + 6 * DX;
  const y0 = currentRef.height / 4 + 6 * DY;
  const height = 15;
  const a = new Date(Date.now());
  const b = new Date(a.getFullYear() + '-01-01');

  const render = () => {
    ctx.clearRect(0, 0, currentRef.width, currentRef.height);
    ctx.fillRect(0, 0, currentRef.width, currentRef.height);
    stackDrawingObject.forEach((drawObject) => drawObject());
  };

  ctx.lineJoin = 'round';
  ctx.fillStyle = 'transparent';
  ctx.scale(1, 1);

  if (drawingType.includes('month')) {
    dataChunks.map((_, y) =>
      stackDrawingObject.push(
        ...drawMonthText(
          ctx,
          x0 - (-1 + y) * DX,
          y0 + (y + 1) * DY,
          2 * GRID_SIZE,
          GRID_SIZE,
          height,
          // NOTE this is teamorary state for a sample data.
          y % 4 === 0
            ? { text: '' + (a.getMonth() + 1 - parseInt('' + y / 4, 10)) }
            : undefined
        )
      )
    );
  }
  if (drawingType.includes('day')) {
    !!dataChunks[0] &&
      dataChunks[0].map((_, x) =>
        stackDrawingObject.push(
          ...drawDayText(
            ctx,
            x0 - (x + length) * DX,
            y0 + (length - x) * DY,
            2 * GRID_SIZE,
            GRID_SIZE,
            height,
            { text: DAYS[x] }
          )
        )
      );
  }

  render();
};

export const renderObject = (
  ctx: CanvasRenderingContext2D,
  currentRef: HTMLCanvasElement,
  dataChunks: number[][],
  drawingType: 'box' | 'grass'
) => {
  const stackDrawingObject: any[] = [];
  const drawObject = drawingType === 'box' ? drawCube : drawGrasses;
  const x0 = currentRef.width / 2 + 6 * DX;
  const y0 = currentRef.height / 4 + 6 * DY;
  const height = drawingType === 'box' ? 5 : 15;

  const render = () => {
    ctx.clearRect(0, 0, currentRef.width, currentRef.height);
    ctx.fillRect(0, 0, currentRef.width, currentRef.height);
    stackDrawingObject.forEach((drawObject) => drawObject());

    drawingType === 'grass' && requestAnimationFrame(render);
  };

  ctx.lineJoin = 'round';
  ctx.fillStyle = 'transparent';
  ctx.scale(1, 1);

  dataChunks.map((contributes, y) =>
    contributes.map((_, x) =>
      stackDrawingObject.push(
        ...drawObject(
          ctx,
          x0 - (x + y) * DX,
          y0 + (y - x) * DY,
          2 * GRID_SIZE,
          GRID_SIZE,
          height
        )
      )
    )
  );

  render();
};
