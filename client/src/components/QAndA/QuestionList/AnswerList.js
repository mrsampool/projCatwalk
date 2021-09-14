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
        const [readMore, setReadMore] = useState(false);
        const abody = ans.body;
        return (
          <div key= {ans.id}>
            <div className="A-statement" >
              <p>A: {(readMore || abody.length < 20)? abody :`${abody.substring(0,20)}...`}
                {(abody.length > 20) ? (<button onClick={()=>setReadMore(!readMore)}>{readMore ? 'hide content': 'show more'}</button>) : null}
              </p>
            </div>
            <div className="A-date" >date:{ans.date}</div>
          </div>
        )
      })}

  </div>
  )
};