import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalStyle } from 'styles/global-style';

function App() {
  return (
    <Router>
      <GlobalStyle />
    </Router>
  );
}

export default App;
