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
    setLastIdx(aLen);
  };
  return (
  <div id='Answer-List'>
      {answerKeys.slice(0, lastIdx).map(eachkey=>{
        var ans = answers[eachkey];
        var isFirst= answerKeys.indexOf(eachkey) === 0;
        console.log(isFirst)
        return <EachAnswer key = {ans.id} ans = {ans} isFirst={isFirst}/>
      })
      }
      {(lastIdx < aLen) ? <a className="loadMoreA"onClick = {loadMoreA}><strong>load more answers</strong></a> : null}
  </div>

  )
};