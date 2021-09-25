import React, { useContext } from 'react';
import {render} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { singleProduct as currentProduct} from '../../../dummyData/productsList';
import { ProductContext } from '../../../contexts/ProductContext';

import {QAndA} from '../QAndA';

describe("Question Component",()=>{
  beforeEach(() => {
    act(()=>{
      render(
        <ProductContext.Provider value={{currentProduct}}>
          <QAndA/>
        </ProductContext.Provider>
        )
    });
  });

  it('renders the SearchBar Component', () => {
    let elements1 = document.getElementsByClassName('.A-statement');
    let elements2 = document.getElementsByClassName('.helpful');
    let sameLen = elements1.length===elements2.length
    expect(sameLen).toBe(true);
  });


});