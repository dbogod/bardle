import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const toggleTheme = () => {
    setCurrentTheme(prev => {
      if (prev === 'light') {
        return 'dark';
      }
      
      return 'light';
    });
  };

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