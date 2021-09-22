// Libraries
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Route } from 'react-router-dom';

// Views
import { ProductDetail } from './views/ProductDetail/ProductDetail.jsx';
import { Products } from './views/Products/Products.jsx';
import { Landing } from './views/Landing/Landing.jsx';

// Components
import {Banner} from "./components/Banner/Banner.jsx";

// Contexts
import {QueryContext} from "./contexts/ProductContext";

// Utils
import {parseQueries} from "./utils/parseQueries";
import {QueryContext} from "./contexts/QueryContext";

export const App = props =>{

  let queries = parseQueries( useLocation().search );
  let [queryParams, setQueryParams] = useState(queries || {});

  return(
    <div id={'App'}>
      <QueryContext.Provider value={queryParams}>

        <Banner/>

        <Route exact path='/products'>
          <Products/>
        </Route>

        <Route exact path='/products/:productId'>
          <ProductDetail />
        </Route>

        <Route exact path='/'>
          <Landing/>
        </Route>

      </QueryContext.Provider>
    </div>
  );
}