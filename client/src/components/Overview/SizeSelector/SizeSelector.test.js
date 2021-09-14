// Libraries
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

// Components
import {SizeSelector} from './SizeSelector.jsx';

let skus = {
  "1549611": {
      "quantity": 8,
      "size": "XS"
  },
  "1549612": {
      "quantity": 16,
      "size": "S"
  },
  "1549613": {
      "quantity": 0,
      "size": "M"
  },
  "1549614": {
      "quantity": 10,
      "size": "L"
  },
  "1549615": {
      "quantity": 15,
      "size": "XL"
  },
  "1549616": {
      "quantity": 4,
      "size": "XL"
  }
};

describe("Size Selector", ()=>{

  it('should be a dropdown list', ()=>{
    render( <SizeSelector /> );
    let sizeSelector = screen.queryByTestId( 'SizeSelector' );
    expect( sizeSelector.nodeName ).toBe('SELECT');
  });

  it('should list all of the available sizes for the current style', ()=>{

    render( <SizeSelector skus={skus} /> );
    let sizeSelector = screen.queryByTestId( 'SizeSelector' );
    let optionValues = Array.from(sizeSelector.options).map( option => {
      return option.value;
    });

    ['XS', 'S', 'L', 'XL'].forEach( size => {
      expect(optionValues.includes(size)).toBe(true);
    })

    expect( sizeSelector.disabled ).toBe( false );

  });

  it('should only list sizes in stock', ()=>{

    render( <SizeSelector skus={skus} /> );
    let sizeSelector = screen.queryByTestId( 'SizeSelector' );
    let optionValues = Array.from(sizeSelector.options).map( option => {
      return option.value;
    });

    expect( optionValues.includes('M') ).toBe( false );

  });

  it('if no sizes in stock, dropdown should be inactive and read OUT OF STOCK', ()=> {

    let noStockSkus = {
      "1549611": {
          "quantity": 0,
          "size": "XS"
      }
    };

    render( <SizeSelector skus={noStockSkus} /> );
    let sizeSelector = screen.queryByTestId( 'SizeSelector' );
    let optionValues = Array.from(sizeSelector.options).map( option => {
      return option.value;
    });

    expect( optionValues[0] ).toBe( 'OUT OF STOCK' );
    expect( sizeSelector.disabled ).toBe( true );
    let noStockMessage = screen.getByText('OUT OF STOCK');
    expect( noStockMessage ).toBeTruthy();

  });

  it('by default, should show "Select Size"', ()=>{

    render( <SizeSelector skus={skus} /> );
    let sizePrompt = screen.getByText('Select Size');
    expect( sizePrompt ).toBeTruthy();

  });


  it('should call state setter function on change', ()=>{

    let sizeState = null;

    let sizeSetter = (selectedSize) => {
      sizeState = selectedSize;
    }

    render( <SizeSelector skus={skus} setSize={sizeSetter} /> );

    let sizeSelector = screen.queryByTestId( 'SizeSelector' );
    fireEvent.change( sizeSelector, {target: {value: 'XL'}} );

    expect(sizeState).toBe('XL');

  });

  test.todo('When collapsed, should show selected size');
});