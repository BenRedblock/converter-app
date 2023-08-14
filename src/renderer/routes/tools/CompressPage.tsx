import { useContext, useState } from "react";
import { HistoryContext } from "renderer/utils/context/HistoryContext";

export default function CompressPage() {
  const { history } = useContext(HistoryContext)
  const [ inputPath, setInputPath ] = useState()

}
