import React, {useContext, useState} from 'react';
import {QuestionContext} from '../QuestionContext'

export const AnswerForm = (props) =>{
  const questions = props.questions;
  const addQuestion = props.addQuestion;
  const ModalFinished = props.finished;
  const {addAnswer, AnsId, storeAnsID, currentProduct} = useContext(QuestionContext);
  const ProductName = currentProduct === null ? 'product' : currentProduct.name
  const {Qid, Qbody} = props;
  const [body, setContent] = useState('');
  const [answerer_name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [id, setAid] = useState(AnsId);
  const [helpfulness, setHelpful] = useState(0);
  const [reported, setReported] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([body, answerer_name, email].every((element)=> element!=='')){
      setAid(id+1);
      storeAnsID(id+1);
      const answer_date = new Date().toISOString();
      addAnswer(Qid, id, body, answer_date, answerer_name, helpfulness, reported, photos);
      setContent('');
      setUsername('');
      setEmail('');
      ModalFinished();
    } else {
      let arr = ['answer', 'name', 'email'];
      let index = [body, answerer_name, email].indexOf('');
      alert(`Invalid, please complete ${arr[index]} entries`)
    }

  }
  return (
    <form onSubmit={handleSubmit} id="answerForm">
      <h1>Submit your answer</h1>
      <h2>{ProductName}:{Qbody.length<50?Qbody:Qbody.slice(0,40)+'...'}</h2>
      <textarea maxLength="1000" placeholder="your answer" onChange={(e)=>{setContent(e.target.value)} } value={body}/>

      <input type = "text" placeholder="jack543!" onChange={(e)=>{setUsername(e.target.value)}} value={answerer_name}/>

      <input type = "email" placeholder="jack@email.com" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>

      <button type="submit" value="Submit">Submit</button>
    </form>
  );
}