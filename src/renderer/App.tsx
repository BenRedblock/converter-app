/* eslint-disable react/jsx-no-constructed-context-values */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import ExtractFramesPage from './routes/tools/extractFramesPage';
import HomePage from './routes/HomePage';
import Navbar from './components/Navbar';
import XboxGameBarClipsSorting from './routes/tools/XboxGameBarClipsSorting';
import { ConfigData, HistoryType, SnackbarType } from './utils/types';
import { ConfigDataContext } from './utils/context/ConfigDataContext';
import VideoConverterPage from './routes/tools/VideoConverterPage';
import { HistoryContext } from './utils/context/HistoryContext';
import { Alert, Snackbar } from '@mui/material';
import { SnackbarContext } from './utils/context/SnackbarContext';
import AudioConverterPage from './routes/tools/AudioConverterPage';

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

  const updateSnackbar = (snackbar: SnackbarType) => setSnackbar(snackbar);

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
    if(type === 'Compress')
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
                  <Route
                    path="/tools/vid2img"
                    element={<ExtractFramesPage />}
                  />
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
