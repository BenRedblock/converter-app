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
import { useState } from 'react';

export const themeOptions= createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#000'
    }
  },
});
export default function App() {
const [page, setPage] = useState<string>()

  const updatePage = (string: string) => setPage(string);

  return (
    <>
      <SelectedPageContext.Provider value={{page, updatePage}}>
      <ThemeProvider theme={themeOptions}>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>} />
            <Route
              path="/tools/vid2img"
              element={<Vid2ImgPage></Vid2ImgPage>}
            />
          </Routes>
        </Router>
      </ThemeProvider>
      </SelectedPageContext.Provider>
    </>
  );
}
