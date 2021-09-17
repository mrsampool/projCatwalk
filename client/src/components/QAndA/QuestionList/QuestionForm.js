import React, {useContext, useState} from 'react';
import {QuestionContext} from '../QuestionContext'

export const QuestionForm = (props) =>{
  const questions = props.questions;
  const addQuestion = props.addQuestion;
  //const {questions, addQuestion} = useContext(props.QuestionContext);
  const ProductName = 'product' //todo
  const [question_body, setContent] = useState('');
  const [asker_name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [question_id, setQid] = useState(500);
  const [question_helpfulness, setHelpful] = useState(0);
  const [reported, setReported] = useState(false);
  const [answers, setAnswer] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([question_body, asker_name].every((element)=> element!=='')){
      setQid(question_id+1);
      const question_date = new Date().toISOString();
      addQuestion(question_id, question_body, question_date, asker_name,question_helpfulness, reported, answers);
      setContent('');
      setUsername('');
      setEmail('');
    } else {
      alert('Invalid, please complete all entries')
    }

  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Ask Your Question</h1>
      <h2>About the {ProductName}</h2>
      <textarea maxLength="1000" placeholder="your question" onChange={(e)=>{setContent(e.target.value)} } value={question_body}/>

      <input type = "text" placeholder="Example:jackson11!" onChange={(e)=>{setUsername(e.target.value)}} value={asker_name}/>

      <input type = "text" placeholder="Why did you like the product or not" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>

      <button type="submit" value="Submit">Submit</button>
    </form>
  );
}
