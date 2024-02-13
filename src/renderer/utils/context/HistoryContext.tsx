import { createContext } from 'react';
import { HistoryType } from '../types';

type HistoryContextType = {
  history?: HistoryType;
};

// eslint-disable-next-line import/prefer-default-export
export const HistoryContext = createContext<HistoryContextType>({});
