import React, { CSSProperties, FunctionComponent, useMemo } from 'react';

interface WaferCircleProps {
  diameter: number;
  size: number;
}

function getCircleStyle(diameter: number): CSSProperties {
  return {
    height: diameter,
    width: diameter,
    position: 'relative',
    borderRadius: '50%',
    background: 'lightblue',
  };
}
const WaferCircle: FunctionComponent<WaferCircleProps> = ({
  diameter,
  size,
}) => {
  const circleStyle = useMemo(() => getCircleStyle(diameter), [diameter]);
  const containerStyle: CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    zIndex: -2,
  };
  return (
    <div style={containerStyle}>
      <div style={circleStyle} />
    </div>
  );
};

export default WaferCircle;
