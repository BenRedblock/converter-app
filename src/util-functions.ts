
/**
     * Returns the name of an folder or file
     * @param path Videopath
     */
export const getNameFromPath = (path: string) => {
  const name = path.replace(/\\/g, "/").split("/").pop()
  const output: {name: string | undefined; type: "folder" | "file"} = {name: name, type: name?.split(".")?.length === 1 ? "folder" : "file"}
  return output
}
