import { createContext } from "react";
import { HistoryType } from "../types"

type HistoryContextType = {
  history?: HistoryType;
}

export const HistoryContext = createContext<HistoryContextType>({
})
