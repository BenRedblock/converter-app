import { createContext } from 'react';

type MobileContextType = {
  mobile?: boolean;
  updateMobile: (boolean: boolean) => void;
};

// eslint-disable-next-line import/prefer-default-export
export const MobileContext = createContext<MobileContextType>({
  updateMobile: () => {},
});
