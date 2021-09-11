// Libraries
import React from 'react';
import {render, screen} from '@testing-library/react';

// Components
import { QtySelector } from './qtySelector.jsx';

// Dummy Data
import { singleProductStyles } from '../../../dummyData/productsList';
import './qtySelector.css';
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

  test.todo('max should be either the number of selected style and size in stock, limited to 15');

  it('options should be a sequence of ints ranging from 1 to the max', ()=>{

    let skus = [
      { quantity: 8, size: 'M' },
      { quantity: 2, size: 'L' },
    ];

    render(
      <QtySelector
        size='XS'
        skus={skus}
      />
    );

    let qtySelector = screen.queryByTestId( 'QtySelector' );
    let options = Array.from( qtySelector.options );
    options.forEach( option => {
      console.log( Number(option.value) );
      expect( typeof Number(option.value) ).toBe('number');
      expect( Number(option.value) ).not.toBe(NaN);
    });
    //expect( qtySelector.value ).toBe( '1' );
  });
});