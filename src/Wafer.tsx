import React, { useMemo } from 'react';

import { calculateRadius, listLabels } from './utils';

// An item is a square in the wafer grid
export interface WaferItem {
  index: string;
  label?: string;
}

// Main component properties
export interface WaferProps {
  rows: number;
  columns: number;
  size: number;
  pickedItems: WaferItem[]; // List of taken items
  onSelect?: (
    position: Record<'x' | 'y', number>,
    label: string,
    picked: boolean,
  ) => void;
}

export function Wafer(props: WaferProps) {
  const { rows, columns, size, pickedItems = [], onSelect } = props;
  const devices = useMemo(() => listLabels(rows, columns, pickedItems), [
    rows,
    columns,
    pickedItems,
  ]);

  const groupsSquares = useMemo(() => {
    const squareWidth = size / columns;
    const squareHeight = size / rows;

    let groupsSquares = new Array(rows);
    for (let row = 0; row < rows; row++) {
      let rowGroup = new Array(columns);
      for (let column = 0; column < columns; column++) {
        const index = row * columns + column;
        const translate = `translate(${column * squareWidth}, ${
          row * squareHeight
        })`;
        rowGroup[column] = (
          <g key={column} transform={translate}>
            <rect
              x={0}
              y={0}
              width={squareWidth}
              height={squareHeight}
              fill={devices[index].picked ? '#5dbb6d' : 'transparent'}
              stroke="#222"
              onClick={() =>
                onSelect(
                  { x: column, y: row },
                  devices[index].label,
                  devices[index].picked,
                )
              }
            />
            <text
              x={squareWidth / 2}
              y={squareHeight / 2}
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {devices[index].label}
            </text>
          </g>
        );
      }
      groupsSquares[row] = <g key={row}>{rowGroup}</g>;
    }
    return groupsSquares;
  }, [rows, columns, size, devices, onSelect]);

  return (
    <svg height={size} width={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        fill="#549ADA"
        r={calculateRadius(size, rows, columns)}
      />
      {groupsSquares}
    </svg>
  );
}
