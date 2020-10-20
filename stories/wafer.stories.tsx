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
  },
} as Meta;

export function Control(props: WaferProps) {
  return <Wafer size={320} {...props} />;
}
