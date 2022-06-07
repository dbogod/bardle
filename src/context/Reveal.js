import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const RevealContext = createContext();

const RevealProvider = ({ children }) => {
  const [isRowBeingRevealed, setIsRowBeingRevealed] = useState(null);

  return (
    <RevealContext.Provider value={{ isRowBeingRevealed, setIsRowBeingRevealed }}>
      {children}
    </RevealContext.Provider>
  );
};

RevealProvider.propTypes = {
  children: PropTypes.object.isRequired
};

export { RevealProvider, RevealContext };