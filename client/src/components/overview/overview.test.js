// Libraries
import React from 'react';
import {render, screen} from '@testing-library/react';

// Components
import {Overview} from './Overview.jsx';

// Mock Data
import { singleProduct as product } from '../../dummyData/productsList';



describe("Overview", ()=>{

  const {container} = render( <Overview/> );
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
    render( <Overview product={product} /> );
    it(`Should display product ${ text }`, ()=>{
      expect( screen.getByText(product[text]).toBeTruthy() );
    });
  });

  /*
  [
    'category',
    'name',
    'description',
    'slogan',
    '#prod-price',
    '#select-style',
    '#select-size',
    '#add-cart',
  ].forEach( element => {

    it(`Contains a ${element.slice(1)} element`, ()=>{

      console.log(component);

      let element = component.querySelectorAll(element);
      console.log(element.length);
      expect(element).toBeTruthy();
    })

  });

  describe("Product Price", ()=>{
    test.todo('should be dependent on the style currently selected');
    test.todo('should appear in red with a struckthrough original price if SKU is currently discounted');
  });

  describe("Add To Cart", ()=>{
    test.todo('should be a button');
    test.todo('if "Select Size" is selected: clicking should open size dropdown - also gives message "Please select a size"');
    test.todo('if no stock, button should be hidden');
    test.todo('if valid size and qty are selected, clicking will add to cart');
  });

  */

});