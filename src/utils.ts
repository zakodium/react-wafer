export function listLabels(rows: number, columns: number): string[] {
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
        labels[index] = '';
      } else if (
        // Edges
        (row === 1 && column === 1) ||
        (row === 1 && column === columns - 2) ||
        (row === rows - 2 && column === 1) ||
        (row === rows - 2 && column === columns - 2)
      ) {
        labels[index] = '';
      } else {
        labels[index] = String(++currNumber);
      }
      index++;
    }
  }
  return labels;
}

export function calculateDiameter(size: number, rows: number, columns: number) {
  const step = { x: size / columns, y: size / rows };
  const cathetus = {
    x: (columns - (columns > rows ? 2 : 4)) * step.x,
    y: (columns - (columns > rows ? 4 : 2)) * step.x,
  };
  return Math.sqrt(Math.pow(cathetus.x, 2) + Math.pow(cathetus.y, 2));
}
