import { createContext } from "react";

type SelectedPageContextType = {
  page?: string;
  updatePage: (string: string) => void;
};

export const SelectedPageContext = createContext<SelectedPageContextType>({
    updatePage: () => {},
});
