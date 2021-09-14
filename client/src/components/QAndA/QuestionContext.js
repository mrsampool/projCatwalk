import React, {useState, createContext} from 'react';

import {listQuestions, answersList} from '../../dummyData/anwsersList'

export const QuestionContext = createContext();

const QuestionContextProvider = (props) =>{
  const [questions, setQuestions] = useState(listQuestions.results) //
  return (
  <QuestionContext.Provider value={{questions}}>
    {props.children}
  </QuestionContext.Provider>
  );
}
export default QuestionContextProvider;