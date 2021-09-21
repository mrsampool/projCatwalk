import React, {useState, useEffect, useContext} from 'react';

import {QuestionList} from './QuestionList/QuestionList'
import {QuestionForm} from './QuestionList/QuestionForm'
import {SearchBar} from './SearchBar/SearchBar'
import QuestionContextProvider from './QuestionContext.js'
import { ProductContext } from '../../contexts/product-context.js';
//Css
import './QAndA.css'



export const QAndA = (props) =>{


  const [searchTerm, setSearchTerm] = useState('');
  const changeSearchTerm = (term) => {
    setSearchTerm(term);
  }

  return (
  <div id='QAndA' data-testid='QAndA'>
    <p id= 'Qtitle'>QUESTIONS & ANSWERS</p>
    <SearchBar changeSearchTerm={changeSearchTerm}/>

    <QuestionContextProvider>
      <QuestionList searchTerm = {searchTerm}/>
    </QuestionContextProvider>


  </div>
  )
}