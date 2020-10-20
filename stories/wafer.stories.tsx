import { Meta } from '@storybook/react';
import React from 'react';

import { Wafer, WaferProps } from '../src/Wafer';

export default {
  title: 'Example/Wafer',
  component: Wafer,
  argTypes: {
    test: {
      defaultValue: 'test',
      control: 'string',
    },
  },
} as Meta;

export function Control(props: WaferProps) {
  return <Wafer {...props} />;
}

export function SmallWafer() {
  return <Wafer test="test" />;
}
