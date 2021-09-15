// Libraries
import React from 'react';
import {render, screen} from '@testing-library/react';
import {toHaveStyle} from '@testing-library/jest-dom/extend-expect'

// Components
import { Price } from './Price.jsx';


describe("Product Price", ()=>{


  it('should be dependent on the style currently selected', ()=>{

    const style = {
      "style_id": 266902,
      "name": "Forest Green & Black",
      "original_price": "140.00",
      "sale_price": null,
      "default?": true,
      "skus": {
          "1549611": {
              "quantity": 8,
              "size": "XS"
          },
          "1549612": {
              "quantity": 16,
              "size": "S"
          },
          "1549613": {
              "quantity": 17,
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
      }
    };

    render( <Price style={style} /> );
    expect( screen.getByText( style.original_price ) ).toBeTruthy();

  });

  it('should display the sale price if currently discounted', ()=>{

    const discountStyle = {
      "style_id": 266902,
      "name": "Forest Green & Black",
      "original_price": "140.00",
      "sale_price": "100.00",
      "default?": true,
      "skus": {
          "1549611": {
              "quantity": 8,
              "size": "XS"
          },
          "1549612": {
              "quantity": 16,
              "size": "S"
          },
          "1549613": {
              "quantity": 17,
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
      }
    };

    render( <Price style={discountStyle} /> );

    let fullPrice = screen.getByText( discountStyle.original_price );
    expect( fullPrice ).toBeTruthy();

    let salePrice = screen.getByText( discountStyle.sale_price );
    expect( salePrice ).toBeTruthy();
  });
});