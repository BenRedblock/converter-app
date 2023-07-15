import { createContext } from "react";

type MobileContextType = {
  mobile?: boolean;
  updateMobile: (boolean: boolean) => void;
};

export const MobileContext = createContext<MobileContextType>({
    updateMobile: () => {},
});
