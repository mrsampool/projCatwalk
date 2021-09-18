import React, {useContext, useState} from 'react';
import {QuestionContext} from '../QuestionContext'

export const AnswerForm = (props) =>{
  const questions = props.questions;
  const addQuestion = props.addQuestion;

  const {addAnswer, AnsId, storeAnsID} = useContext(QuestionContext);
  const {Qid, Qbody} = props;
  const ProductName = 'product'; //todo
  const [body, setContent] = useState('');
  const [answerer_name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [id, setAid] = useState(AnsId); //todo
  const [helpfulness, setHelpful] = useState(0);
  const [reported, setReported] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([body, answerer_name, email].every((element)=> element!=='')){
      console.log('ccc1: '+id);
      setAid(id+1);
      console.log('ccc2: '+id);
      storeAnsID(id+1); 
      const answer_date = new Date().toISOString();
      addAnswer(Qid, id, body, answer_date, answerer_name, helpfulness, reported, photos);
      setContent('');
      setUsername('');
      setEmail('');
    } else {
      alert('Invalid, please complete all entries')
    }

  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit your answer</h1>
      <h2>{ProductName}:{Qbody}</h2>
      <textarea maxLength="1000" placeholder="your answer" onChange={(e)=>{setContent(e.target.value)} } value={body}/>

      <input type = "text" placeholder="jack543!" onChange={(e)=>{setUsername(e.target.value)}} value={answerer_name}/>

      <input type = "text" placeholder="jack@email.com" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>

      <button type="submit" value="Submit">Submit</button>
    </form>
  );
}