import React, {useState, createContext} from 'react';

import {listQuestions, answersList} from '../../dummyData/answersList'

export const QuestionContext = createContext();

const QuestionContextProvider = (props) =>{
  const [questions, setQuestions] = useState(listQuestions.results) //

  const addQuestion = (question_id, question_body, question_date, asker_name, question_helpfulness, reported, answers) => {
    setQuestions([...questions, {
      question_id, question_body, question_date, asker_name,question_helpfulness, reported, answers
    }])
  }
  return (
  <QuestionContext.Provider value={{questions, addQuestion}}>
    {props.children}
  </QuestionContext.Provider>
  );
}
export default QuestionContextProvider;