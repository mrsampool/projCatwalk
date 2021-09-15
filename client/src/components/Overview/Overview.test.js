// Libraries
import React from 'react';
import {render, screen} from '@testing-library/react';

// Components
import {Overview} from './Overview.jsx';

// Mock Data
import { singleProduct as product, singleProductStyles as styles } from '../../dummyData/productsList';

describe("Overview", ()=>{

  const {container} = render( <Overview product={product} styles={styles} /> );
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
      render( <Overview product={product} styles={styles} /> );
      expect( screen.getByText(product[text]) ).toBeTruthy();
    });

  });

  [
    'select-style',
    'select-size',
    'prod-price',
    'add-cart'
  ].forEach( element => {

    it(`Renders a ${element} component`, ()=>{
      render( <Overview product={product} styles={styles} /> );
      let rendered = screen.queryByTestId(element);
      expect( rendered ).toBeTruthy();
    })

  });



});