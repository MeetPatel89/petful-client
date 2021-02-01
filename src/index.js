import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from './context/context';
import App from './App';

ReactDOM.render(
  <Router>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Router>,
  document.getElementById('root')
);
