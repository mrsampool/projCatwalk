import React, { useContext } from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import {AnswerList} from "./AnswerList";
import {EachAnswer} from "./EachAnswer";
import {listQuestions} from '../../../dummyData/answersList'

describe("Test for the AnswerList", ()=>{
  /* beforeEach(()=>{
    act(()=>{
      render(<SearchBar/>);
    });
  }); */

  it('renders the each Answer Component', () => {
    const  AnsId = 70;
    const ans = listQuestions.results[1]['answers'][70];

    console.log('ans: ',ans);
    const isFirst = true;
    const {queryByTestId} = render(<EachAnswer key = {AnsId} ans = {ans} isFirst={isFirst}/>);
    let elementS = queryByTestId('A-statement');
    let elementD = queryByTestId('A-date');
    expect(elementS).toBeTruthy();
    expect(elementD).toBeTruthy();
  });


  it('load more answer after clicking on the load more button', ()=>{
    const  AnsId = 70;
    const ans = listQuestions.results[1]['answers']['70'];
    ans.body = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const isFirst = true;
    var readMore = false;
    const {queryByTestId} = render(<EachAnswer key = {AnsId} ans = {ans} isFirst={isFirst}/>);

    if (ans.body.length > 70){
      if (readMore){
        let element = queryByTestId('notexpanded');
        expect(element).toBeTruthy();
        fireEvent.click(screen.queryByTestId('ReadMore'));
        let element2 = queryByTestId('expanded');
        expect(element2).toBeTruthy();
      } else {
        let element = queryByTestId('expanded');
        expect(element).toBeTruthy();
        fireEvent.click(screen.queryByTestId('ReadMore'));
        let element2 = queryByTestId('notexpanded');
        expect(element2).toBeTruthy()
      }
    }

  })

  it('test helpful and reported', ()=>{
    const  AnsId = 70;
    const ans = listQuestions.results[1]['answers']['70'];
    const helpfulhere = ans.helpfulness;
    const isFirst = true;
    const {queryByTestId} = render(<EachAnswer key = {AnsId} ans = {ans} isFirst={isFirst}/>);
    let elementh = queryByTestId('helpfultest');
    expect(elementh).toBeTruthy();
    fireEvent.click(screen.queryByText(/Yes/));
    
    let elementr = queryByTestId('report');
    expect(elementr).toBeTruthy();
    fireEvent.click(screen.queryByTestId('report'));
    expect( screen.queryByText(/Reported/) ).toBeTruthy();
  })


})