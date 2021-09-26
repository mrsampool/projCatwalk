import React, { useContext } from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { singleProduct as currentProduct} from '../../../dummyData/productsList';
import { ProductContext } from '../../../contexts/ProductContext';
import QuestionContextProvider from '../QuestionContext.js'
import {AnswerForm} from './AnswerForm'
import {listQuestions} from '../../../dummyData/answersList'
import {QAndA} from '../QAndA';

describe("Answer Form Component",()=>{

  it('renders the Question Form Component', () => {
    const ModalFinished = jest.fn();
      var questions = listQuestions.results;
      const addQuestion = jest.fn();
      var Qid = 38;
      var Qbody = questions[1]['answers'][70]['body'];
      const {queryByPlaceholderText, queryByTestId, getByLabelText, getByRole} = render(
        <ProductContext.Provider value={{currentProduct}}>
          <QuestionContextProvider>
            <AnswerForm finished = {ModalFinished} Qid={Qid} Qbody= {Qbody} questions = {questions} addQuestion={addQuestion}/>
          </QuestionContextProvider>
        </ProductContext.Provider>
      )
    expect( screen.queryByText(/Submit your answer/) ).toBeTruthy();
    expect( screen.queryAllByTestId('aForm') ).toHaveLength(1);

    const textInput = queryByPlaceholderText('your answer');
    fireEvent.change(textInput, {target: {value: 'test'}});
    expect(textInput.value).toBe('test');


  });

  it('renders the answer Form Component', () => {
      const ModalFinished = jest.fn();
      var questions = listQuestions.results;
      const addQuestion = jest.fn();
      var Qid = 38;
      var Qbody = questions[1]['answers'][70]['body'];
      const {queryByPlaceholderText, queryByTestId, getByLabelText, getByRole} = render(
        <ProductContext.Provider value={{currentProduct}}>
          <QuestionContextProvider>
            <AnswerForm finished = {ModalFinished} Qid={Qid} Qbody= {Qbody} questions = {questions} addQuestion={addQuestion}/>
          </QuestionContextProvider>
        </ProductContext.Provider>
      )

    const textInput = queryByPlaceholderText('your answer');
    fireEvent.change(textInput, {target: {value: 'test'}});
    fireEvent.change(getByLabelText('name'),{target:{value:"me"}})
    fireEvent.change(getByLabelText('email'),{target:{value:"email@test.com"}})
    fireEvent.click(screen.queryByTestId('answersubmit'))
    expect(ModalFinished).toHaveBeenCalled();




  });

});