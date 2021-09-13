import React from 'react';

import {QuestionList} from './QuestionList/QuestionList'
import {SearchBar} from './SearchBar/SearchBar'
import {TwoButtons} from './TwoButtons/TwoButtons'


export const QAndA = () =>{
  return (
  <div id='QAndA' data-testid='QAndA'>
    <p>QUESTIONS & ANSWERS</p>
    <SearchBar/>
    <QuestionList/>
    <TwoButtons/>
  </div>
  )
}