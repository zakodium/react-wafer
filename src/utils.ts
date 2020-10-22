import { WaferItem } from './Wafer';

/**
 * Return ordered list of labels for the grid
 * @param rows Number of rows
 * @param columns Number of columns
 * @param picked List of picked items
 * @returns List of labels, with a number if the square is complete, empty othewise
 */
export function listLabels(
  rows: number,
  columns: number,
  picked: WaferItem[],
): Array<{ label: string; picked: boolean }> {
  let labels = new Array(rows * columns);
  let index = 0;
  let currNumber = 0;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (
        // Borders
        row === 0 ||
        column === 0 ||
        column + 1 >= columns ||
        row + 1 >= rows
      ) {
        labels[index] = { label: '', picked: false };
      } else if (
        // Edges
        (row === 1 && column === 1) ||
        (row === 1 && column === columns - 2) ||
        (row === rows - 2 && column === 1) ||
        (row === rows - 2 && column === columns - 2)
      ) {
        labels[index] = { label: '', picked: false };
      } else {
        const label = String(++currNumber);
        const pickedSearch = picked.find((item) => item.index === label);
        labels[index] = pickedSearch
          ? { label: pickedSearch.label || label, picked: true }
          : { label, picked: false };
      }
      index++;
    }
  }
  return labels;
}

/**
 * Calculates the diameter of the inscribed circle
 * @param size Pixel's size of the parent square
 * @param rows Number of rows
 * @param columns Number of columns
 * @returns diameter in pixels of the inscribed circle
 */
export function calculateDiameter(
  size: number,
  rows: number,
  columns: number,
): number {
  const step = { x: size / columns, y: size / rows };
  const cathetus = {
    x: (columns - (columns > rows ? 2 : 4)) * step.x,
    y: (columns - (columns > rows ? 4 : 2)) * step.x,
  };
  return Math.sqrt(Math.pow(cathetus.x, 2) + Math.pow(cathetus.y, 2));
}
