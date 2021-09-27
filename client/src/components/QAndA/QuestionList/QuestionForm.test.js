import React, { useContext } from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { singleProduct as currentProduct} from '../../../dummyData/productsList';
import { ProductContext } from '../../../contexts/ProductContext';
import QuestionContextProvider from '../QuestionContext.js'
import {QuestionForm} from './QuestionForm'
import {listQuestions} from '../../../dummyData/answersList'
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
  it('renders the Question Form Component', () => {
    const ModalFinished = jest.fn();
    var q = listQuestions.results;
    const addQuestion = jest.fn();

    const {queryByPlaceholderText, queryByTestId, getByLabelText, getByRole} = render(
      <ProductContext.Provider value={{currentProduct}}>
        <QuestionContextProvider>
          <QuestionForm finished={ModalFinished} questions = {q} addQuestion={addQuestion}/>
        </QuestionContextProvider>
      </ProductContext.Provider>
    )
    const handleSubmit = jest.fn()
    expect( screen.queryByText(/Ask Your Question/) ).toBeTruthy();
    expect( screen.queryAllByTestId('QForm') ).toHaveLength(1);

    const textInput = queryByPlaceholderText('your question');
    fireEvent.change(textInput, {target: {value: 'test'}});
    expect(textInput.value).toBe('test');


  });

  it('renders the Question Form Component', () => {
    const ModalFinished = jest.fn();
    var q = listQuestions.results;
    const addQuestion = jest.fn();
    const handleSubmit = jest.fn()

    const {queryByPlaceholderText, queryByTestId, getByLabelText, getByRole} = render(
      <ProductContext.Provider value={{currentProduct}}>
        <QuestionContextProvider>
          <QuestionForm finished={ModalFinished} questions = {q} addQuestion={addQuestion}/>
        </QuestionContextProvider>
      </ProductContext.Provider>
    )

    const textInput = queryByPlaceholderText('your question');
    fireEvent.change(textInput, {target: {value: 'test'}});
    fireEvent.change(getByLabelText('Name'),{target:{value:"me"}})
    fireEvent.change(getByLabelText('Email'),{target:{value:"email@test.com"}})
    fireEvent.click(screen.queryByTestId('Qformbtn'))

    expect(ModalFinished).toHaveBeenCalled();






  });

});