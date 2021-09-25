//React
import React, {useContext} from 'react';
import {useState} from 'react';
import {QuestionContext} from '../QuestionContext';
import {EachAnswer} from './EachAnswer';
import './QuestionList.css'

export const AnswerList = (props) =>{
  const answers = props.question.answers;
  const answerKeys = Object.keys(answers);
  const arrayofObj = answerKeys.map(key=>{
    return answers[key];
  })
  var sortedAnsArr = arrayofObj.sort((a,b)=>{
    return b.helpfulness - a.helpfulness;
  })
  const [lastIdx, setLastIdx] = useState(2);
  const aLen = answerKeys.length;
  const loadMoreA = () => {
    setLastIdx(aLen);
  };
  return (
  <div id='Answer-List' data-testid="answer-list">
      {sortedAnsArr.slice(0, lastIdx).map(ans=>{
        var isFirst= sortedAnsArr.indexOf(ans) === 0;
        return <EachAnswer key = {ans.id} ans = {ans} isFirst={isFirst}/>
      })
      }
      {(lastIdx < aLen) ? <a className="loadMoreA" data-testid='load-Ans' onClick = {loadMoreA}><strong>load more answers</strong></a> : null}
  </div>

  )
};