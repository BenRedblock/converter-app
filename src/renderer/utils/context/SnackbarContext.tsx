import { createContext } from 'react';
import { SnackbarType } from '../types';

type SnackbarContextType = {
  snackbar?: SnackbarType;
  updateSnackbar: (snackbar: SnackbarType) => void;
};

// eslint-disable-next-line import/prefer-default-export
export const SnackbarContext = createContext<SnackbarContextType>({
  updateSnackbar: () => {},
});
