import React, { CSSProperties, FunctionComponent, useMemo } from 'react';

import WaferCircle from './WaferCircle';
import { calculateDiameter, listLabels } from './utils';

export interface WaferItem {
  index: string;
  isTaken?: boolean;
}

export interface WaferProps {
  rows: number;
  columns: number;
  size: number;
  items: WaferItem[];
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
    borderWidth: '1.5px 0 0 1.5px',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
  };
}

function getItemStyle(
  rows: number,
  columns: number,
  size: number,
): CSSProperties {
  return {
    height: size / rows - 1.5,
    width: size / columns - 1.5,
    borderWidth: '0 1.5px 1.5px 0',
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
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
  const diameter = useMemo(() => calculateDiameter(size, rows, columns), [
    rows,
    columns,
    size,
  ]);
  return (
    <div style={waferStyle}>
      <WaferCircle diameter={diameter} size={size} />
      {devices.map((val, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`device_${index}`} style={itemStyle}>
          {val}
        </div>
      ))}
    </div>
  );
};
