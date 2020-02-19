import { validateParams } from '../src/validator';
import IDrawParams from '../src/IDrawParams';
import draw, { pixels } from '../src/draw';

const getValue = (data: FormData, name: string): number => parseInt(data.get(name).toString());

const drawRectangles = (params: IDrawParams): string => {
  const pixelArray: Array<Array<number>> = draw(params);
  let rectangleStr: string = '';
  pixelArray.forEach((row: Array<number>) => {
    row
      .map((num: number) => {
        const char: string = pixels[num];
        return char === ' ' ? '\u00A0' : char;
      })
      .forEach((char: string) => rectangleStr += char);
    rectangleStr += '\n';
  });
  return rectangleStr;
}

const main = (): void => {
  const form: HTMLFormElement = document.querySelector('#form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const errorElement: HTMLSpanElement = document.querySelector('#error');
    const contentElement: HTMLDivElement = document.querySelector('#content');
    errorElement.classList.remove('show');
    contentElement.innerText = '';

    const data: FormData = new FormData(form);
    const width = getValue(data, 'width');
    const height = getValue(data, 'height');
    const padding = getValue(data, 'padding');
    const params = { width, height, padding };

    try {
      validateParams(params);
    } catch (error) {
      errorElement.innerText = error.toString();
      errorElement.classList.add('show');
    }

    contentElement.innerText = drawRectangles(params);
  });
}

document.addEventListener('readystatechange', (): void => {
  if (document.readyState !== 'interactive') return;
  main();
});

