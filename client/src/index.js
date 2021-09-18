// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import {App} from './App.jsx';

// Global Style Sheets
import './globalStyles/text.css';
import './globalStyles/colors.css';
import './globalStyles/elements.css';

ReactDOM.render(
  <Router>
    <Route path={['/products/:productId', '/']}>
      <App />
    </Route>
  </Router>
  , document.getElementById('root')
)