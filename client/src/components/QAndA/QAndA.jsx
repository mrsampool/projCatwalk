import React, {useState} from 'react';

import {QuestionList} from './QuestionList/QuestionList'
import {QuestionForm} from './QuestionList/QuestionForm'
import {SearchBar} from './SearchBar/SearchBar'
import {TwoButtons} from './TwoButtons/TwoButtons'
import QuestionContextProvider from './QuestionContext.js'

export const QAndA = (props) =>{
  const [searchTerm, setSearchTerm] = useState('');
  const changeSearchTerm = (term) => {
    setSearchTerm(term);
  }
  return (
  <div id='QAndA' data-testid='QAndA'>
    <p>QUESTIONS & ANSWERS</p>
    <SearchBar changeSearchTerm={changeSearchTerm}/>

    <QuestionContextProvider>
      <QuestionList searchTerm = {searchTerm}/>
    </QuestionContextProvider>


  </div>
  )
}