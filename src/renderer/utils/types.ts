export type ConfigData = {
  xboxClipsPath?: string
}

export type SnachbarType = {
  open: boolean;
  message: string,
  type: "error" | "warning" | "info" | "success",
}

export type ipcMainresponse ={
  completed: true,
  message: string
}
