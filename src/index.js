import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from './context/Theme';
import { ModalProvider } from './context/Modal';
import { RevealProvider } from './context/Reveal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <RevealProvider>
      <ModalProvider>
        <React.StrictMode>
          <App/>
        </React.StrictMode>
      </ModalProvider>
    </RevealProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
