import { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { saveThemePreference, getThemePreference } from '../lib/localStorage';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const getSystemPreference = () => {
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  };
  
  const [currentTheme, setCurrentTheme] = useState(getThemePreference() ?? getSystemPreference());
  const toggleTheme = () => {
    setCurrentTheme(prev => {
      if (prev === 'light') {
        return 'dark';
      }
      
      return 'light';
    });
  };
  
  useEffect(() => {
    saveThemePreference(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.object.isRequired
};

export { ThemeProvider, ThemeContext };