import {
  MemoryRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import './App.css';
import Vid2ImgPage from './routes/tools/vid2imgPage';
import { HomePage } from './routes/HomePage';
import Navbar from './components/Navbar';
import { dark } from '@mui/material/styles/createPalette';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { SelectedPageContext } from './utils/context/SelectedPageContext';
import { useEffect, useState } from 'react';
import XboxGameBarClipsSorting from './routes/tools/XboxGameBarClipsSorting';
import { ConfigData } from './utils/types';
import { ConfigDataContext } from './utils/context/ConfigDataContext';

export const themeOptions= createTheme({
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
const [page, setPage] = useState<string>()
const [configData, setConfigData] = useState<ConfigData>()

  const updatePage = (string: string) => setPage(string);

  const updateData = () => window.electron.syncData()

    window.electron.ipcRenderer.once('syncData',(data)=> {
      if (data && typeof data === 'object')
      setConfigData(data)
    })

  return (
    <>
    <ConfigDataContext.Provider value={{configData, updateData}}>
      <SelectedPageContext.Provider value={{page, updatePage}}>
      <ThemeProvider theme={themeOptions}>
        <Router>
          <Routes>
            <Route path='/*' element={<Navbar />} />
          </Routes>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>} />
            <Route
              path="/tools/vid2img"
              element={<Vid2ImgPage></Vid2ImgPage>}
            />
            <Route path='/tools/xbox-sorting' element={<XboxGameBarClipsSorting />} />
          </Routes>
        </Router>
      </ThemeProvider>
      </SelectedPageContext.Provider>
      </ConfigDataContext.Provider>
    </>
  );
}
