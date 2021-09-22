import React, { useContext } from 'react';
import { ProductContextProvider, ProductContext } from './ProductContext';

import {render, screen } from '@testing-library/react';

// Hooks must be used within a component
const Test = (props) => {
  const context = useContext(ProductContext);
  return (
    <ProductContextProvider>
      <p>{JSON.stringify(context[props.dataName])}</p>
    </ProductContextProvider>
    );
}

describe('ProductContextProvider and ProductContext', () => {
  
  it('should be able to access the default/dummy reviewsData from the context', () => {
    render( <Test dataName={'reviewsData'}/> );
    expect( screen.queryByText(/I'm enjoying wearing these shades/) ).toBeTruthy();
  });

  it('should be able to access the default/dummy reviewsMetadata from the context', () => {
    render( <Test dataName={'reviewsMetadata'}/> );
    expect( screen.queryByText(/"characteristics":/) ).toBeTruthy();
  });

  it('should be able to access the default/dummy questionsData from the context', () => {
    render( <Test dataName={'questionsData'}/> );
    expect( screen.queryByText(/Why is this product cheaper here/) ).toBeTruthy();
  });

  it('should be able to access the default/dummy answersData from the context', () => {
    render( <Test dataName={'answersData'}/> );
    expect( screen.queryByText(/Something pretty durable but I can't be sure/) ).toBeTruthy();
  });

});