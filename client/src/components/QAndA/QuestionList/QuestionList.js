//React
import React, {useContext,useState} from 'react';
import {QuestionContext} from '../QuestionContext';
import {AnswerList} from './AnswerList';
import {Helpful} from './Helpful';
import { Modal } from '../../Modal/Modal.jsx';
import {QuestionForm} from './QuestionForm';

//Stylesheet
import './QuestionList.css'

export const QuestionList = (props) =>{
  const {searchTerm} = props;
  const [modalState, setModalState] = useState(null);
  const {questions, addQuestion} = useContext(QuestionContext);
  const [lastIndex, setLastIndex] = useState(2);
  var qLen = questions.length;
  var questionsfiltered = questions;
  if (searchTerm.length >= 3) {
    questionsfiltered = questions.filter((each)=>{
      if (each.question_body.toLowerCase().includes(searchTerm.toLowerCase())){
        return each;
      }
    })
    qLen = questionsfiltered.length
  }
  const loadMore = () => {
    setLastIndex(lastIndex+2);
  };

  function handleModal(){
    setModalState(<QuestionForm questions = {questions} addQuestion={addQuestion}/>)
  }

  return (
  <div id='QuestionList' style={{color: 'yellow', background: 'green'}}>
      {(searchTerm.length < 3 ? questions : questionsfiltered).slice(0, lastIndex).map(q=>{
        return (
          <div key={q.question_id}>
            <div className="Q-statement" >Q: {q.question_body}</div>
            <Helpful question_helpfulness = {q.question_helpfulness}/>

            <AnswerList question = {q}/>
          </div>
        )
      })
      }
      {lastIndex < qLen ? <a onClick = {loadMore}>load more</a>:null}
      <Modal component = {modalState} setComponent={setModalState}/>
      <button onClick={ handleModal } >Ask a question</button>
  </div>
  )
};