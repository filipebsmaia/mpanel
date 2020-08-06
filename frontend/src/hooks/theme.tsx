import React, { createContext, useState, useContext } from 'react';
import {
  ThemeProvider as StyledComponentsThemeProvider,
  DefaultTheme,
} from 'styled-components';

import dark from '../styles/themes/dark';
// import light from '../styles/themes/light';

// const themes = [dark, light];

interface ThemeContextData {
  theme: DefaultTheme;
  setTheme: (theme: DefaultTheme) => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme>(dark);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledComponentsThemeProvider theme={theme}>
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
