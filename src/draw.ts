import IDrawParams from "./IDrawParams";
import { validateParams, spaceRemains } from "./validator";

const BORDER = 1;

const pixels = Object.freeze({
  0: " ",
  1: "-",
  2: "|"
});

const initRectangle = ({ width, height }: IDrawParams): Array<Array<number>> => {
  const array: Array<Array<number>> = [];
  for (let rowIndex = 0; rowIndex < height; ++rowIndex) {
    const row: Array<number> = [];
    for (let itemIndex = 0; itemIndex < width; ++itemIndex) {
      const isVerticalBorder = itemIndex === 0 || itemIndex === width - 1;
      const isHorizontalBorder = rowIndex === 0 || rowIndex === height - 1;
      if (isVerticalBorder) row.push(2);
      else if (isHorizontalBorder) row.push(1);
      else row.push(0);
    }
    array.push(row);
  }
  return array;
};

const createRectangle = ({ width, height, array }: IDrawParams): Array<Array<number>> => {
  // iterate over rows
  for (let rowIndex = 0; rowIndex < array.length; ++rowIndex) {
    const topPosition = (array.length - height) / 2 + BORDER;
    const bottomPosition = array.length - topPosition;

    // iterate over items in row
    for (let itemIndex = 0; itemIndex < array[rowIndex].length; ++itemIndex) {
      const leftPosition = (array[rowIndex].length - width) / 2 + BORDER;
      const rightPosition = array[rowIndex].length - leftPosition;

      // calculate horizontal borders
      const isItemInHorizontalBorder = itemIndex + 1 >= leftPosition && itemIndex <= rightPosition;
      if (isItemInHorizontalBorder) {
        if (rowIndex + 1 === topPosition) array[rowIndex][itemIndex] = 1;
        else if (rowIndex === bottomPosition) array[rowIndex][itemIndex] = 1;
      }

      // calculate vertical borders
      const isItemInVerticalBorder = rowIndex + 1 >= topPosition && rowIndex <= bottomPosition;
      if (isItemInVerticalBorder) {
        if (itemIndex + 1 === leftPosition) array[rowIndex][itemIndex] = 2;
        else if (itemIndex === rightPosition) array[rowIndex][itemIndex] = 2;
      }
    }
  }
  return array;
};

const draw = (params: IDrawParams): Array<Array<number>> => {
  const { width, height, padding, firstRun = true } = params;
  let { array } = params;
  if (firstRun) validateParams(params);
  if (spaceRemains(params)) {
    const newWidth = width - padding - BORDER * 2;
    const newHeight = height - padding - BORDER * 2;
    const newParams: IDrawParams = {
      width: newWidth,
      height: newHeight,
      padding,
      array: firstRun ? initRectangle(params) : createRectangle(params),
      firstRun: false
    };
    return draw(newParams);
  } else return array;
};

const printPixelArray = (array: Array<Array<number>>): void => {
  array.forEach(row =>
    console.log(
      row
        .map(num => pixels[num])
        .reduce((str, char) => (str += char), "")
    )
  );
};

export default draw;
export { IDrawParams, printPixelArray };
