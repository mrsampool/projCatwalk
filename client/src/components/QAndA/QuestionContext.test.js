import React, { useContext } from 'react';
import {render} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { singleProduct as currentProduct} from '../../dummyData/productsList';
import { ProductContext } from '../../contexts/ProductContext';

import {QAndA} from './QAndA';

describe("QuestionList Component",()=>{
  beforeEach(() => {
    act(()=>{
      render(
        <ProductContext.Provider value={{currentProduct}}>
          <QAndA/>
        </ProductContext.Provider>
        )
    });
  });


  it('renders the QuestionList Component', () => {
    let element = document.querySelector('#QuestionList');
    expect(element).toBeTruthy();
  });



});