/* eslint-disable react/jsx-no-constructed-context-values */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import Vid2ImgPage from './routes/tools/vid2imgPage';
import HomePage from './routes/HomePage';
import Navbar from './components/Navbar';
import { SelectedPageContext } from './utils/context/SelectedPageContext';
import XboxGameBarClipsSorting from './routes/tools/XboxGameBarClipsSorting';
import { ConfigData } from './utils/types';
import { ConfigDataContext } from './utils/context/ConfigDataContext';
import VideoConverterPage from './routes/tools/VideoConverterPage';

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
  const [page, setPage] = useState<string>();
  const [configData, setConfigData] = useState<ConfigData>();

  const updatePage = (string: string) => setPage(string);

  const updateData = () => window.electron.syncData();

  window.electron.ipcRenderer.once('syncData', (data) => {
    if (data && typeof data === 'object') setConfigData(data);
  });

  return (
    <ConfigDataContext.Provider value={{ configData, updateData }}>
      <SelectedPageContext.Provider value={{ page, updatePage }}>
        <ThemeProvider theme={themeOptions}>
          <Router>
            <Routes>
              <Route path="/*" element={<Navbar />} />
            </Routes>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools/vid2img" element={<Vid2ImgPage />} />
              <Route
                path="/tools/xbox-sorting"
                element={<XboxGameBarClipsSorting />}
              />
              <Route
                path="/tools/video-converter"
                element={<VideoConverterPage />}
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </SelectedPageContext.Provider>
    </ConfigDataContext.Provider>
  );
}
