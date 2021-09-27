import React, { useContext } from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { singleProduct as currentProduct} from '../../../dummyData/productsList';
import { ProductContext } from '../../../contexts/ProductContext';
import QuestionContextProvider from '../QuestionContext.js'

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

  it('load more question after clicking on the load more button', ()=>{

    expect( screen.queryByText('MORE ANSWERED QUESTIONS') ).toBeTruthy();
    expect( screen.queryAllByTestId('Q-statement') ).toHaveLength(2);
    fireEvent.click(screen.queryByText(/MORE ANSWERED QUESTIONS/));

    expect( screen.queryByText(/MORE ANSWERED QUESTIONS/) ).toBeTruthy();
    expect( screen.queryAllByTestId('Q-statement') ).toHaveLength(4);

  })

  it('should add a button', ()=>{

    expect( screen.queryByText('Ask A QUESTION +') ).toBeTruthy();
    expect( screen.queryAllByTestId('addaq') ).toHaveLength(1);
    fireEvent.click(screen.queryByText(/Ask A QUESTION +/));

    expect( screen.queryByTestId('QForm') ).toBeTruthy();
``
  })

  it('test for search term', ()=>{
    let searchTerm = 'why';
    <QuestionContextProvider>
      <QuestionList searchTerm = {searchTerm}/>
    </QuestionContextProvider>
    expect( screen.queryAllByTestId('Q-Helpful') ).toHaveLength(2);
  })


});