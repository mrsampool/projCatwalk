import React, {useState, createContext, useEffect, useContext} from 'react';

import {listQuestions, answersList} from '../../dummyData/answersList'

//newly added
import { ProductContext } from '../../contexts/product-context';
import { serverRequests } from '../../utils/serverRequests.js';

export const QuestionContext = createContext();

const QuestionContextProvider = (props) =>{

  const [questions, setQuestions] = useState(listQuestions.results)
  let { currentProduct } = useContext(ProductContext);

  function fetchQandAData(){
    serverRequests.getProductQuestions(currentProduct.id)
    .then( questionData => {
      console.log(questionData);//real data 44388
      console.log('xxx');
      setQuestions(questionData.results.sort((a,b)=>{
        return b.question_helpfulness - a.question_helpfulness;
      }));
    })
    .catch( err => console.log('err') );
  }

  useEffect( ()=>{
    if (currentProduct !== null){
      fetchQandAData();
    } else {
      setQuestions(listQuestions.results.sort((a,b)=>{
        return b.question_helpfulness - a.question_helpfulness;
      }));
    }

  }, [currentProduct]);


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