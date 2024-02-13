import { createContext } from 'react';
import { ConfigData } from '../types';

type ConfigDataContextType = {
  configData?: ConfigData;
  updateData: () => void;
};

// eslint-disable-next-line import/prefer-default-export
export const ConfigDataContext = createContext<ConfigDataContextType>({
  updateData: () => {},
});
