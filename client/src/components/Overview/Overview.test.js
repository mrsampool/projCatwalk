// Libraries
import React from 'react';
import {render, screen} from '@testing-library/react';

// Components
import {Overview} from './Overview.jsx';

// Mock Data
import { singleProduct as currentProduct, singleProductStyles as styles } from '../../dummyData/productsList';
import { dummyReviewsMetadata as reviewsMetadata } from "../../dummyData/dummyReviewsMetadata";
import { ProductContext } from '../../contexts/ProductContext';

describe("Overview", ()=>{

  const {container} = render(
    <ProductContext.Provider value={{currentProduct, reviewsMetadata}}>
      <Overview />
    </ProductContext.Provider>
  );
  let component = container.querySelector('#Overview');

  it("Renders without crashing", ()=>{
    expect(component).toBeTruthy();
  });

  [
    'category',
    'name',
    'description',
    'slogan',
  ].forEach( text => {
    it(`Should display product ${ text }`, ()=>{
      render(
        <ProductContext.Provider value={{currentProduct, reviewsMetadata}}>
          <Overview />
        </ProductContext.Provider>
      );
      expect( screen.getByText(currentProduct[text]) ).toBeTruthy();
    });

  });

  [
    'select-style',
    'select-size',
    'prod-price',
    'add-cart'
  ].forEach( element => {

    it(`Renders a ${element} component`, ()=>{
      render(
        <ProductContext.Provider value={{currentProduct, reviewsMetadata}}>
          <Overview />
        </ProductContext.Provider>
      );
      let rendered = screen.queryByTestId(element);
      expect( rendered ).toBeTruthy();
    });

  });
});