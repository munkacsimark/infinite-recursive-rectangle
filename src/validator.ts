import { isEven } from "./helpers";
import IDrawParams from "./IDrawParams";

const MIN_WIDTH = 20;
const MIN_HEIGHT = 20;
const MIN_PADDING = 4;

const validateParams = ({ width, height, padding }: IDrawParams): void => {
  if (!isEven(width) || width < MIN_WIDTH) throw Error(`Width should be >= ${MIN_WIDTH}`);
  if (!isEven(height) || height < MIN_HEIGHT) throw Error(`Height should be >= ${MIN_HEIGHT}`);
  if (!isEven(padding) || padding < MIN_PADDING) throw Error(`Padding should be >= ${MIN_PADDING}`);
};

const spaceRemains = ({ width, height, padding }: IDrawParams): boolean =>
  (height >= 0 && width >= 2) || (width >= 0 && height >= 2);

export { validateParams, spaceRemains };
