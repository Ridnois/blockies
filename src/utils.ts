import { hash, randomFloat } from './randomFloat';

export type imageProps = hash & {
  height?: number,
  width?: number,
  size?: number,
}

export type BlockieProps = imageProps & {
  color?: string;
  bgcolor?: string;
  scale: number;
}

export const randomHSL = (origin: hash) => {
  const rand = randomFloat(origin);
  return [rand() * 360, rand() * 60 + 40, rand() * rand() * rand() * 25 + "%"];
}

export const gridArray = (origin: imageProps) => {
  let { width = 8, height = 8, size } = origin;
  height = size ?? height;
  width = size ?? width;
  const dataWidth = Math.ceil(width / 2);
  const rand = randomFloat(origin);
  const y = new Array(height).fill(0);
  const fillRow = () => Math.floor(rand() * 2.3);
  const grid = y.map((i: number) => {
    const row = new Array(dataWidth).fill(0).map(fillRow);
    const sliced = row.slice(0, dataWidth);
    const reversed = sliced.reverse();
    return row.concat(reversed);
  });
  return grid.flat();
}

export const render = (element: HTMLCanvasElement = document.createElement("canvas")) => (origin: BlockieProps) => {
  const data = gridArray(origin);
  if (element.getContext("2d")) {
    const width = data.length;
    const ctx = element.getContext("2d")
    // @ts-ignore
    ctx.fillRect(0, 0, width, width);
    // @ts-ignore
    ctx.fillStyle = origin.bgcolor || "red";
    data.map((i: number) => {
      if (i) {
        const row = Math.floor(i / width);
        const col = i % width;
        //
        // @ts-ignore
        ctx.fillStyle = (i == 1) ? "green" : "blue";
        // @ts-ignore
        ctx.fillRect(col * origin.scale, row * origin.scale, origin.scale, origin.scale);
      }
    })
  }
  return element;
}

export function createIcon(opts: BlockieProps, canvas: HTMLCanvasElement) {
  const data = gridArray(opts);
  const cc = render(canvas);
  return cc(opts);
}