import React, {useContext, useState} from 'react'


export const Helpful = (props) => {
  const [helpful, setHelpful] = useState(props.question_helpfulness);
  const [helpfuled, setHelpfuled] = useState(false);
  const addHelpful = () => {
    if (!helpfuled){
      setHelpful(helpful+1);
      setHelpfuled(true);
    }
  };
  return(
  <div className="helpful" >helpful? <a onClick={addHelpful}>Yes</a> ({helpful}) <u>Add an answer </u></div>
  )

}