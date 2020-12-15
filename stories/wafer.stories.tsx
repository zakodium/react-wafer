import { Meta } from '@storybook/react';
import React from 'react';

import { Wafer, WaferProps } from '../src/Wafer';

export default {
  title: 'Example/Wafer',
  component: Wafer,
  argTypes: {
    rows: {
      defaultValue: '6',
      control: 'number',
    },
    columns: {
      defaultValue: '7',
      control: 'number',
    },
    onSelect: { action: 'onSelect' },
  },
} as Meta;

export function Control(props: WaferProps) {
  const pickedItems = [{ index: '3' }, { index: '5', label: 'owner' }];
  const selected = ['3', '12', { x: 3, y: 3 }];
  return (
    <Wafer
      pickedItems={pickedItems}
      selected={selected}
      size={320}
      {...props}
    />
  );
}
