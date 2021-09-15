// Libraries
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

// Components
import { AddToCart } from './AddToCart.jsx';

describe("Add To Cart", ()=>{

  it('should be a button', ()=>{
    render( <AddToCart /> );
    let addCart = screen.queryByTestId( 'add-cart' );
    expect( addCart.nodeName ).toBe('BUTTON');
  });

  it('if no valid style and quantity selected, button should be disabled', ()=>{
    render( <AddToCart /> );
    let addCart = screen.queryByTestId( 'add-cart' );
    expect( addCart.disabled ).toBe(true);
  });

// IMPORTANT NOTE:
// The test below (click "ADD TO BAG" button) has been tested and is passing as of 9.15.21 5:36pm
// It is now x'd out so as not to run API calls every time the test suites are ran
// In order to test that this behavior is still functioning properly, change the "xit" to "it"
  xit('if valid size and qty are selected, clicking will add to cart', ()=>{

    let sku = [
      "1549625",
      { "quantity": 17, "size": "M" }
    ];

    let statusState = null;
    let statusSetter = function(status) { statusState = status };

    render( <AddToCart sku={sku} qty={5} statusListener={statusSetter} /> );
    let addCart = screen.queryByTestId( 'add-cart' );
    fireEvent.click(addCart);
    return statusState.then( response => {
      expect( response ).toBe( 'Created' );
    });
  });

  test.todo('if "Select Size" is selected: clicking should open size dropdown - also gives message "Please select a size"');

});