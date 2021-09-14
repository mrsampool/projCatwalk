//React
import React, {useContext} from 'react';
import {QuestionContext} from '../QuestionContext';
//Stylesheet
import './QuestionList.css'

export const QuestionList = () =>{
  const {questions} = useContext(QuestionContext)
  return (
  <div id='QuestionList' style={{color: 'yellow', background: 'green'}}>

      {questions.map(q=>{

        return (
          <div key={q.question_id}>
            <div className="Q-statement" >Q: {q.question_body}</div>
            
          </div>
        )
      })}

  </div>
  )
};