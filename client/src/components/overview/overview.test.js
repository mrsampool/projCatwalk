import React from 'react';
import {render} from '@testing-library/react';

import {Overview} from './Overview.jsx';

describe("Overview", ()=>{

  const {container} = render( <Overview/> );
  let component = container.querySelector('#Overview');

  it("Renders without crashing", ()=>{

    expect(component).toBeTruthy();

  });

  [
    '#prod-category',
    '#prod-title',
    '#prod-description',
    '#prod-price',
    '#prod-description',
    '#select-style',
    '#select-size',
    '#add-cart',
  ].forEach( element => {
    it(`Contains a ${element.slice(5)} element`, ()=>{
      let element = component.querySelector(element);
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

});