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
  ].forEach( element => {

    it(`Contains a ${element} element`, ()=>{
      render( <Overview product={product} styles={styles} /> );
      let rendered = screen.queryByTestId(element);
      console.log( rendered );
      expect( rendered ).toBeTruthy();
    })

  });

  describe("Product Price", ()=>{
    test.todo('should exist');
    test.todo('should be dependent on the style currently selected');
    test.todo('should appear in red with a struckthrough original price if SKU is currently discounted');
  });

  describe("Add To Cart", ()=>{

    it('should exist', ()=>{
      render( <Overview product={product} styles={styles} /> );
      let addButton = screen.getByText('ADD TO BAG');
      expect( addButton ).toBeTruthy();
    })

    test.todo('should be a button');
    test.todo('if "Select Size" is selected: clicking should open size dropdown - also gives message "Please select a size"');
    test.todo('if no stock, button should be hidden');
    test.todo('if valid size and qty are selected, clicking will add to cart');
  });

});