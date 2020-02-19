import draw, { IDrawParams, printPixelArray } from "./draw";

// Set params here
const params: IDrawParams = {
  width: 10,
  height: 20,
  padding: 8
};

const pixelArray: Array<Array<number>> = draw(params);
printPixelArray(pixelArray);
