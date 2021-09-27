import React, { useContext } from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import {AnswerList} from "./AnswerList";
import {EachAnswer} from "./EachAnswer";
import {listQuestions} from '../../../dummyData/answersList'

describe("Test for the AnswerList",()=>{
  /* beforeEach(()=>{
    act(()=>{
      render(<SearchBar/>);
    });
  }); */

  it('renders the Answer Component', () => {
    var AnsId = 5;
    var q = listQuestions.results[0];
    const {queryByTestId} = render(<AnswerList key={AnsId} question = {q}/>);
    let element = queryByTestId('answer-list');
    expect(element).toBeTruthy();
  });


  it('load more answer after clicking on the load more button', ()=>{
    var AnsId = 70;
    var q = listQuestions.results[1];
    const {queryByTestId} = render(<AnswerList key={AnsId} question = {q}/>);
    let element = queryByTestId('load-Ans');
    expect( screen.queryAllByTestId('A-statement') ).toHaveLength(2);
    fireEvent.click(screen.queryByText(/load more answers/).closest('a'));

    expect( screen.queryByText(/load more answers/) ).toBeFalsy();
    expect( screen.queryAllByTestId('A-statement') ).toHaveLength(3);

  })



});