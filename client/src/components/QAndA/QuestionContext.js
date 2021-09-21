import React, {useState, createContext, useEffect, useContext} from 'react';

import {listQuestions, answersList} from '../../dummyData/answersList'

//newly added
import { ProductContext } from '../../contexts/product-context';
import { serverRequests } from '../../utils/serverRequests.js';

export const QuestionContext = createContext();

const QuestionContextProvider = (props) =>{

  let { QandAdata } = useContext(ProductContext);
  const [questions, setQuestions] = useState(QandAdata.results) //

  useEffect(() => {
    setQuestions(QandAdata.results)
  }, [QandAdata]);


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