import React, { CSSProperties, FunctionComponent, useMemo } from 'react';

export interface WaferItem {
  index: string;
  isTaken?: boolean;
}

export interface WaferProps {
  rows: number;
  columns: number;
  size: number;
  items: WaferItem[];
  showFlat?: boolean;
  onSelect?: () => void;
  onBlur?: () => void;
}

function getWaferStyle(columns: number, size: number): CSSProperties {
  return {
    height: size,
    width: size,
    display: 'grid',
    gap: 0,
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    borderWidth: '2px 0 0 2px',
    borderStyle: 'solid',
  };
}

function getItemStyle(
  rows: number,
  columns: number,
  size: number,
): CSSProperties {
  return {
    height: size / rows - 2,
    width: size / columns - 2,
    borderWidth: '0 2px 2px 0',
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}

function listLabels(rows: number, columns: number): string[] {
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

export const Wafer: FunctionComponent<WaferProps> = (props) => {
  const { rows, columns, size } = props;
  const devices = useMemo(() => listLabels(rows, columns), [rows, columns]);
  const waferStyle = useMemo(() => getWaferStyle(columns, size), [
    columns,
    size,
  ]);
  const itemStyle = useMemo(() => getItemStyle(rows, columns, size), [
    rows,
    columns,
    size,
  ]);
  return (
    <div style={waferStyle}>
      {devices.map((val, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`device_${index}`} style={itemStyle}>
          {val}
        </div>
      ))}
    </div>
  );
};
