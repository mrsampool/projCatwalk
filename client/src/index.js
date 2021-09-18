// Libraries
import React, { useState, useLocation } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Views
import { App } from './App.jsx';
import { Products } from './views/Products/Products.jsx';
import { Landing } from './views/Landing/Landing.jsx';

// Global Style Sheets
import './globalStyles/text.css';
import './globalStyles/colors.css';
import './globalStyles/elements.css';

export const Wrap = props =>{

  return(
    <Router>

      <Route exact path='/products'>
        <Products/>
      </Route>

      <Route exact path='/products/:productId'>
        <App />
      </Route>

      <Route exact path='/'>
        <Landing/>
      </Route>

    </Router>
  );
}

ReactDOM.render(<Wrap/>, document.getElementById('root') );