// Libraries
import React from 'react';
import {render, screen} from '@testing-library/react';

// Components
import { QtySelector } from './qtySelector.jsx';

// Dummy Data
import { singleProductStyles } from '../../../dummyData/productsList';
import './qtySelector.css';
import { StyleOption } from '../StyleSelector/StyleSelector';
let styles = singleProductStyles.results;

describe("Quantity Selector", ()=>{

  it('should be a dropdown list', ()=>{
    render( <QtySelector /> );
    let qtySelector = screen.queryByTestId( 'QtySelector' );
    expect( qtySelector.nodeName ).toBe('SELECT');
  });

  it('if no size selected - dropdown displays "-" and is disabled', ()=>{
    render( <QtySelector /> );
    let qtySelector = screen.queryByTestId( 'QtySelector' );
    expect( qtySelector.disabled ).toBe( true );
    expect( qtySelector.value ).toBe( '-' );
  });

  it('when a size has been selected, should default to 1', ()=>{
    let skus = [
      { quantity: 8, size: 'M' },
      { quantity: 2, size: 'L' },
    ];

    render( <QtySelector size='M' skus={skus} /> );
    let qtySelector = screen.queryByTestId( 'QtySelector' );
    expect( qtySelector.value ).toBe( '1' );
  });

  it('options should be a sequence of ints ranging from 1 to the max', ()=>{

    let skus = [
      { quantity: 8, size: 'M' },
      { quantity: 2, size: 'L' },
    ];

    render(
      <QtySelector
        size='M'
        skus={skus}
      />
    );

    let qtySelector = screen.queryByTestId( 'QtySelector' );
    let options = Array.from( qtySelector.options );
    let optionValues = options.map( option => option.value );

    options.forEach( option => {
      expect( typeof Number(option.value) ).toBe('number');
      expect( Number(option.value) ).not.toBe(NaN);
    });

    ['1','2','3','4','5','6','7','8'].forEach( number =>{
      expect( optionValues.includes( number ) ).toBe(true);
    })
  });

  it('if more than 15 are in stock, max should be limited to 15', ()=>{

    let skus = [
      { quantity: 25, size: 'M' },
      { quantity: 2, size: 'L' },
    ];

    render(
      <QtySelector
        size='M'
        skus={skus}
      />
    );

    let qtySelector = screen.queryByTestId( 'QtySelector' );
    let options = Array.from( qtySelector.options );
    let optionValues = options.map( option => Number(option.value) );

    expect( Math.max(...optionValues) ).toBe(15);
  });

});