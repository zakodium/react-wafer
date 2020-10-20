import React from 'react';

export interface WaferProps {
  test: string;
}

export const Wafer = ({ test }: WaferProps) => (
  <div className="test">{test}</div>
);
