/* eslint-disable react/jsx-no-constructed-context-values */
import { Alert, Snackbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './routes/HomePage';
import AudioConverterPage from './routes/tools/AudioConverterPage';
import VideoConverterPage from './routes/tools/VideoConverterPage';
import XboxGameBarClipsSorting from './routes/tools/XboxGameBarClipsSorting';
import ExtractFramesPage from './routes/tools/extractFramesPage';
import { ConfigDataContext } from './utils/context/ConfigDataContext';
import { HistoryContext } from './utils/context/HistoryContext';
import { SnackbarContext } from './utils/context/SnackbarContext';
import { ConfigData, HistoryType, SnackbarType } from './utils/types';

export const themeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});
export default function App() {
  const [configData, setConfigData] = useState<ConfigData>();
  const [history, setHistory] = useState<HistoryType>({
    VideoConvert: [],
    extractFrames: [],
    AudioConvert: [],
    Compress: [],
  });
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    open: false,
    message: 'undefined',
    type: 'info',
  });

  const updateData = () => window.electron.syncData();

  const updateSnackbar = (updatedSnackbar: SnackbarType) =>
    setSnackbar(updatedSnackbar);

  window.electron.ipcRenderer.on('history', (type, arg: any) => {
    if (type === 'extractFrames')
      setHistory({
        ...history,
        extractFrames: [arg, ...history.extractFrames],
      });
    if (type === 'VideoConvert')
      setHistory({ ...history, VideoConvert: [arg, ...history.VideoConvert] });
    if (type === 'AudioConvert')
      setHistory({ ...history, AudioConvert: [arg, ...history.AudioConvert] });
    if (type === 'Compress')
      setHistory({ ...history, Compress: [arg, ...history.Compress] });
  });

  window.electron.ipcRenderer.on('syncData', (data) => {
    if (data && typeof data === 'object') setConfigData(data);
  });

  return (
    <ConfigDataContext.Provider value={{ configData, updateData }}>
      <HistoryContext.Provider value={{ history }}>
        <SnackbarContext.Provider value={{ snackbar, updateSnackbar }}>
          <ThemeProvider theme={themeOptions}>
            <Router>
              <Routes>
                <Route path="/*" element={<Navbar />} />
              </Routes>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
              >
                <Alert severity={snackbar.type}>{snackbar.message}</Alert>
              </Snackbar>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tools/vid2img" element={<ExtractFramesPage />} />
                <Route
                  path="/tools/xbox-sorting"
                  element={<XboxGameBarClipsSorting />}
                />
                <Route
                  path="/tools/video-converter"
                  element={<VideoConverterPage />}
                />
                <Route
                  path="/tools/audio-converter"
                  element={<AudioConverterPage />}
                />
              </Routes>
            </Router>
          </ThemeProvider>
        </SnackbarContext.Provider>
      </HistoryContext.Provider>
    </ConfigDataContext.Provider>
  );
}
