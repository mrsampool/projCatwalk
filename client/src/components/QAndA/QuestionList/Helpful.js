import React, {useContext, useState} from 'react';
import { Modal } from '../../Modal/Modal.jsx';
import {QuestionContext} from '../QuestionContext';
import {AnswerForm} from './AnswerForm';
export const Helpful = (props) => {
  const {questions, addQuestion} = useContext(QuestionContext);
  const [modalState, setModalState] = useState(null);
  const {Qid, Qbody} = props
  const [helpful, setHelpful] = useState(props.question_helpfulness);
  const [helpfuled, setHelpfuled] = useState(false);


  const addHelpful = () => {
    if (!helpfuled){
      setHelpful(helpful+1);
      setHelpfuled(true);
    }
  };



  function handleModal(){
    setModalState(<AnswerForm Qid={Qid} Qbody= {Qbody} questions = {questions} addQuestion={addQuestion}/>)
  };

  return(
  <div className="helpful" >helpful? <a onClick={addHelpful}>Yes</a> ({helpful}) <Modal component = {modalState} setComponent={setModalState}/> <u onClick={ handleModal } >Add an answer </u></div>
  )

}