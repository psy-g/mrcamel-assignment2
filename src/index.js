import React from 'react';
import ReactDOM from 'react-dom';
import App from './Routes';

import { GlobalStyle } from 'Styles/GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
