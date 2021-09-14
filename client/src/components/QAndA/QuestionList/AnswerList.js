//React
import React, {useContext} from 'react';
import {QuestionContext} from '../QuestionContext';

export const AnswerList = (props) =>{
  const answers = props.p;
  const answerKeys = Object.keys(answer)
  return (
  <div id='Answer-List' style={{color: 'blue', background: 'red'}}>
      {answerKeys.map(eachkey=>{
        const ans = answers[eachkey];
        return (
            <div key={ans.id} className="A-statement" >A: {ans.body}</div>
        )
      })}

  </div>
  )
};