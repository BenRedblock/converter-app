import { SnackbarType } from "../types"
import { createContext } from "react";

type SnackbarContextType = {
  snackbar?: SnackbarType
  updateSnackbar: (snackbar: SnackbarType) => void;
}

export const SnackbarContext = createContext<SnackbarContextType>({
  updateSnackbar:() => {}
})
