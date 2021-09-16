//React
import React, {useContext} from 'react';
import {useState} from 'react';
import {QuestionContext} from '../QuestionContext';
import {EachAnswer} from './EachAnswer';
import './QuestionList.css'

export const AnswerList = (props) =>{
  const answers = props.question.answers;
  const answerKeys = Object.keys(answers);
  const [lastIdx, setLastIdx] = useState(2);
  const aLen = answerKeys.length;
  const loadMoreA = () => {
    setLastIdx(lastIdx+2);
  };
  return (
  <div id='Answer-List' style={{color: 'blue', background: 'white'}}>
      {answerKeys.slice(0, lastIdx).map(eachkey=>{
        var ans = answers[eachkey];
        return <EachAnswer key = {ans.id} ans = {ans}/>
      })
      }
      {(lastIdx < aLen) ? <u onClick = {loadMoreA}>show more answers</u> : null}
  </div>

  )
};