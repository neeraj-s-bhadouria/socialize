import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Naviagte, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import { themeSettings } from './theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/home' element={<HomePage/>} />
            <Route path='/profile/:userId' element={<ProfilePage/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
