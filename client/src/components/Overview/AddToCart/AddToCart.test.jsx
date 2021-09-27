// Libraries
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

// Components
import { AddToCart } from './AddToCart.jsx';

//Contexts
import {ProductContext} from "../../../contexts/ProductContext";
import {CartContext} from "../../../contexts/CartContext";

// Dummy Data
import { singleProduct as currentProduct } from "../../../dummyData/productsList";
import { singleProductStyles as styles } from "../../../dummyData/productsList";
import {CartDAO} from "../../../utils/CartDAO";
let style = styles.results[0];
let sku = ["1549613",{"quantity":17,"size":"M"}];

describe("Add To Cart", ()=>{

  it('should be a button', ()=>{
    let cart = new CartDAO()
    render(
      <ProductContext.Provider value={{currentProduct}}>
        <CartContext.Provider value={{ cart }}>
          <AddToCart style={style} qty={2} sku={sku}/> );
        </CartContext.Provider>
      </ProductContext.Provider>
    );
    let addCart = screen.queryByTestId( 'add-cart' );
    expect( addCart.nodeName ).toBe('BUTTON');
  });

  it('if no valid style and quantity selected, button should be disabled', ()=>{
    let cart = new CartDAO()
    render(
      <ProductContext.Provider value={{currentProduct}}>
        <CartContext.Provider value={{ cart }}>
          <AddToCart style={style}/> );
        </CartContext.Provider>
      </ProductContext.Provider>
    );
    let addCart = screen.queryByTestId( 'add-cart' );
    expect( addCart.disabled ).toBe(true);
  });

  it('should add item to local storage', ()=>{

    let cart = new CartDAO()
    let firstCart = cart.getItems();
    let firstItems = cart.getBySku(sku) || {qty:0};

    render(
      <ProductContext.Provider value={{currentProduct}}>
        <CartContext.Provider value={{ cartAccess: cart }}>
          <AddToCart style={style} qty={2} sku={sku}/> );
        </CartContext.Provider>
      </ProductContext.Provider>
    );
    fireEvent.click( screen.getByTestId('add-cart') );

    let newItems = cart.getBySku(sku[0]);
    let addedToCart = newItems.qty === firstItems.qty + 2;

    expect(addedToCart).toBe(true);

    cart.replaceItems(firstCart);
  });

  xit('should save sku, quantity, style name, and photo URL', ()=>{

    let cart = new CartDAO()
    let firstCart = cart.getItems();

    render(
      <ProductContext.Provider value={{currentProduct}}>
        <CartContext.Provider value={{ cartAccess: cart }}>
          <AddToCart style={style} qty={2} sku={sku}/> );
        </CartContext.Provider>
      </ProductContext.Provider>
    );
    fireEvent.click( screen.getByTestId('add-cart') );

    let newCart = cart.getItems();
    let addedToCart = newCart.length > firstCart.length;

    expect(addedToCart).toBe(true);

    if (addedToCart){
      newCart.pop();
    }
    cart.replaceItems(newCart);
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