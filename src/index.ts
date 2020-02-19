import draw, { printPixelArray } from "./draw";
import IDrawParams from './IDrawParams';

const args = process.argv.slice(2);

const params: IDrawParams = {
  width: parseInt(args[0]),
  height: parseInt(args[1]),
  padding: parseInt(args[2])
};

const pixelArray: Array<Array<number>> = draw(params);
printPixelArray(pixelArray);
