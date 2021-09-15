import React, {useContext, useState} from 'react'


export const EachAnswer = (props) => {
  const ans = props.ans;
  const abody = ans.body;
  const sellname = ans.answerer_name;
  const [readMore, setReadMore] = useState(false);
  const [helpful, setHelpful] = useState(ans.helpfulness)
  const [Helpfuladded, setHelpfuladded] = useState(false)
  const [reported, setReported] = useState(false)

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  var date = new Date(ans.date);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const addHelpful = () => {
    if (!Helpfuladded){
      setHelpful(helpful+1);
      setHelpfuladded(true);
    }
  }
  const addReport = () => {
    if (!reported){
      setReported(true);
    }
  }

  return (
  <div className = "AnswerContenet">
    <div className="A-statement" >
      <p>A: {(readMore || abody.length < 20)? abody :`${abody.substring(0,20)}...`}
        {(abody.length > 20) ?
        (<button onClick={()=>setReadMore(!readMore)}>{readMore ? 'hide content': 'show more'}</button>)
        : null}
      </p>
    </div>
    <div className="A-date" >
      by {sellname !== "Seller" ? sellname :<strong>Seller</strong>}, {monthNames[month]} {day}, {year} | helpful?
      <u onClick={addHelpful}>Yes</u>
      ({helpful}) |
      <u onClick={addReport}>{reported ? 'Reported' : 'Report'}</u>
    </div>
  </div>
  )
}