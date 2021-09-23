import React from 'react';

import {render,fireEvent} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import {serverRequests} from '../../utils/serverRequests.js';

// Components && Context
import {QAndA} from './QAndA';
import { ProductContext } from '../../contexts/ProductContext';
import { QuestionContext } from './QuestionContext.js'
import { singleProduct as currentProduct} from '../../dummyData/productsList';
import {listQuestions, answersList} from '../../dummyData/answersList'



jest.mock('../../utils/serverRequests.js');
/*
jest.mock('react', ()=>{
  const {listQuestions} = jest.requireActual('../../dummyData/answersList.js');
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn().mockReturnValue({
      questions: listQuestions.results
    }),
  };
});
 */


describe('Questions and Answers rendering', () => {

  beforeEach(() => {
    act(()=>{
      render(
        <ProductContext.Provider value={{currentProduct}}>
          <QAndA/>
        </ProductContext.Provider>)
    });
  });

  it('renders the outmost Questions and Answers component', () => {
    let element = document.querySelector('#QAndA');
    expect(element).toBeTruthy();
  });

  it('renders the title of Questions and Answers component', () => {
    let element = document.querySelector('#Qtitle');
    expect(element).toBeTruthy();
  });




});