import React, { useContext } from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import {Helpful} from "./Helpful";
import {listQuestions} from '../../../dummyData/answersList';
import { ProductContext } from '../../../contexts/ProductContext';
import { singleProduct as currentProduct} from '../../../dummyData/productsList';
import {QAndA} from '../QAndA';
import QuestionContextProvider from '../QuestionContext.js'

describe("Test for the helpful",()=>{
  it('renders the helpful Component', () => {
    var q = listQuestions.results[1];
    var question_helpfulness = 10;


    const {queryByTestId} = render(
      <ProductContext.Provider value={{currentProduct}}>
        <QuestionContextProvider>
          <Helpful Qid = {q.question_id}  Qbody = {q.question_body} question_helpfulness = {question_helpfulness}/>
        </QuestionContextProvider>
      </ProductContext.Provider>);
    let element = queryByTestId('helpful');
    expect(element).toBeTruthy();
    fireEvent.click(screen.queryByTestId('addhelpful'))
    fireEvent.click(screen.queryByTestId('addAnswer'))
    expect(queryByTestId('addhelpful')).toBeTruthy();
    expect(queryByTestId('addAnswer')).toBeTruthy();



  });

});