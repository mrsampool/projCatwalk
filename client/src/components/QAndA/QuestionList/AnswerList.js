//React
import React, {useContext} from 'react';
import {useState} from 'react';
import {QuestionContext} from '../QuestionContext';

import './QuestionList.css'

export const AnswerList = (props) =>{
  const answers = props.question.answers;
  console.log(answers);
  const answerKeys = Object.keys(answers);

  return (
  <div id='Answer-List' style={{color: 'blue', background: 'red'}}>
      {answerKeys.map(eachkey=>{
        const ans = answers[eachkey];
        return (
          <div key= {ans.id}>
            <span className="A-statement" >A: {ans.body}</span>
            <span className="A-date" >date:{ans.date}</span>
          </div>
        )
      })}

  </div>
  )
};