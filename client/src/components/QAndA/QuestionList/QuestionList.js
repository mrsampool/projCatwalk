//React
import React, {useContext,useState} from 'react';
import {QuestionContext} from '../QuestionContext';
import {AnswerList} from './AnswerList';
import {Helpful} from './Helpful';
import { ModalContext } from '../../../contexts/modal-context';
import {QuestionForm} from './QuestionForm';

//Stylesheet
import './QuestionList.css'

export const QuestionList = () =>{
  /* let modalContextObj = useContext(ModalContext);
  if (modalContextObj){
    const {setModalComponent} = modalContextObj;
  } */
  const {setModalComponent} = useContext(ModalContext);
  const {questions, addQuestion} = useContext(QuestionContext);
  const [lastIndex, setLastIndex] = useState(2);
  const qLen = questions.length;
  const loadMore = () => {
    setLastIndex(lastIndex+2);
  };

  function handleClick(){
    let form = (
      <QuestionForm questions={questions} addQuestion={addQuestion}/>
    );
    setModalComponent( form );
  }

  return (
  <div id='QuestionList' style={{color: 'yellow', background: 'green'}}>
      {questions.slice(0, lastIndex).map(q=>{
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
      <button onClick={ handleClick } >Ask a question</button>
  </div>
  )
};