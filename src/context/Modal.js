import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState('');

  return (
    <ModalContext.Provider value={{ currentModal, setCurrentModal }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.object.isRequired
};

export { ModalProvider, ModalContext };