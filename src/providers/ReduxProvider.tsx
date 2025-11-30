'use client';

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from '@/redux';

type Props = { children: ReactNode };

export default function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
