// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import {
  contextBridge,
  ipcRenderer,
  IpcRendererEvent,
  OpenDialogOptions,
  OpenDialogReturnValue,
  SaveDialogOptions,
  SaveDialogReturnValue,
} from 'electron';
import { ConfigData } from 'renderer/utils/types';

export type Channels =
  | 'ipc-example'
  | 'close'
  | 'xbox-clip-sorting'
  | 'syncData'
  | 'update'
  | 'extractFrames'
  | 'video-convert'
  | 'audio-convert'
  | 'history';

const saveData = (data: ConfigData): Promise<boolean> => {
  console.log(`saving Data${data}`);
  return ipcRenderer.invoke('saveData', data);
};

const syncData = () => {
  ipcRenderer.send('syncData');
};

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke(channel: Channels, ...args: unknown[]): Promise<any> {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
  saveData,
  syncData,
  openDialog: (options: OpenDialogOptions): Promise<OpenDialogReturnValue> => {
    return ipcRenderer.invoke('open-dialog', options);
  },
  saveDialog: (options: SaveDialogOptions): Promise<SaveDialogReturnValue> => {
    return ipcRenderer.invoke('save-dialog', options);
  },
  shell: {
    openPath: (path: string) => {
      return ipcRenderer.send('shell', 'openPath', path);
    },
    showItemInFolder: (path: string) => {
      return ipcRenderer.send('shell', 'showItemInFolder', path);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
