import { createContext } from "react";
import { ConfigData } from "../types";

type ConfigDataContextType = {
  configData?: ConfigData;
  updateData: () => void;
};

export const ConfigDataContext = createContext<ConfigDataContextType>({
  updateData: () => {},
});
