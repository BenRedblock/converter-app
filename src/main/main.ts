/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  nativeTheme,
  dialog,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import sortVideosByFirstWord from './functions/sortVideosByFirstWord';
import fs from 'fs';
import { ConfigData } from 'renderer/utils/types';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.checkForUpdates();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    minHeight: 728,
    minWidth: 1024,
    autoHideMenuBar: true,
    frame: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  ipcMain.on('close', (event, arg) => {
    if (arg === 'minimizeApp' && !mainWindow?.isMinimized())
      mainWindow?.minimize();
    if (arg === 'maximizeApp') {
      mainWindow?.isMaximized()
        ? mainWindow?.restore()
        : mainWindow?.maximize();
    }
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
/**
 * Autoupdate Notify
 */
  let version: string = String(autoUpdater.currentVersion)
  autoUpdater.on('update-available', (info) => {
    console.log("update-availible")
    mainWindow?.webContents.send('update', "available", info.version, autoUpdater.currentVersion)
    version = info.version
  });

  autoUpdater.on("download-progress",(info)=> {
    mainWindow?.webContents.send("update", "progress", version, info.percent)
  })

  autoUpdater.on('update-downloaded', (info) => {
    console.log('download ready' + info.version);
    mainWindow?.webContents.send('update', "ready", info.version)
  });
};

const dataPath = app.getPath('userData');

/**
 * Add event listeners...
 */

ipcMain.on('update', (event, arg) => {
  if (arg === 'download') {
    autoUpdater.downloadUpdate();
    event.reply('update',("downloading"))
  }
  if(arg === "ready") {
    autoUpdater.autoRunAppAfterInstall = true
    autoUpdater.quitAndInstall()
  }
});

ipcMain.on('syncData', (event) => {
  let res = fs.existsSync(path.join(dataPath, 'data.json'));
  if (res) {
    let dt = fs.readFileSync(path.join(dataPath, 'data.json'));
    let data = JSON.parse(dt.toString());
    event.reply('syncData', data);
  }
});

ipcMain.handle('saveData', (event, data: ConfigData) => {
  console.log(data);
  let sData = JSON.stringify(data);
  fs.writeFileSync(path.join(dataPath, 'data.json'), sData);
  console.log('Data Saved in' + path.join(dataPath, 'data.json'));
  return true;
});

ipcMain.handle('open-dialog', async (event, options) => {
  const result = await dialog.showOpenDialog(options);
  return result;
});

ipcMain.on('close', (event, arg) => {
  if (arg === 'closeApp') app.quit();
});

ipcMain.handle('xbox-clip-sorting', async (event, arg: string) => {
  return sortVideosByFirstWord(arg);
});

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));

  event.reply('ipc-example', msgTemplate('pong'));
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
