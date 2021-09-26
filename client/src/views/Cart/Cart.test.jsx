import React from 'react';
import {render, screen} from '@testing-library/react';

//Views
import {Cart} from "./Cart";
import {CartContext} from "../../contexts/CartContext";

import {CartDAO} from "../../utils/CartDAO";

let cart = [];

describe("App", ()=>{

  it("Renders without crashing", ()=>{

    render(
      <CartContext.Provider value={{ cartAccess: new CartDAO() }}>
        <Cart/>
      </CartContext.Provider>
    );

  });

  test.todo('should render items from local storage');

  [
    'sku_id',
    'name',
    'style',
    'price',
    'photo',
    'quantity',
  ].forEach( detail =>{
    test.todo(`Should display item ${detail}`);
  })

  test.todo('Should display total cost');
  test.todo('Should display total items');
  test.todo('Should have a functioning remove icon button');

});