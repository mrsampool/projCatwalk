import React, {useState, createContext} from 'react';

import {listQuestions, answersList} from '../../dummyData/answersList'
export const QuestionContext = createContext();

const QuestionContextProvider = (props) =>{

  const [questions, setQuestions] = useState(listQuestions.results) //

  const [AnsId, setAnsId] = useState(300)
  const [newQId, setnewQId] = useState(500)

  const storeAnsID = (currentAnsId) =>{
    setAnsId(currentAnsId)
  }
  const storeNewQID = (currentQId) => {
    setnewQId(currentQId);
    console.log(currentQId);
  }

  const addQuestion = (question_id, question_body, question_date, asker_name, question_helpfulness, reported, answers) => {
    setQuestions([...questions, {
      question_id, question_body, question_date, asker_name,question_helpfulness, reported, answers
    }])
  }

  const addAnswer = (Qid, id, body, answer_date, answerer_name, helpfulness, reported, photos) => {
    let newAns = {id: id, body, date:answer_date, answerer_name, helpfulness, photos}
    let targetedObj = questions.filter(obj => {
      return obj.question_id === Qid
    })
    let index = questions.indexOf(targetedObj[0]);
    targetedObj[0]['answers'][`${id}`] = newAns
    questions[index] = targetedObj[0];
    setQuestions([...questions])
  }
  return (
  <QuestionContext.Provider value={{questions, addQuestion, addAnswer, AnsId, newQId, storeAnsID, storeNewQID}}>
    {props.children}
  </QuestionContext.Provider>
  );
}
export default QuestionContextProvider;