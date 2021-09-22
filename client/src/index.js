// Libraries
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Parent Component
import { App } from "./App";

// Global Style Sheets
import './globalStyles/text.css';
import './globalStyles/colors.css';
import './globalStyles/elements.css';

const root = document.getElementById('root');

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  root
);