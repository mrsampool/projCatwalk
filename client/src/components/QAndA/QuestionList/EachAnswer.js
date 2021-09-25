import React, {useContext, useState} from 'react'


export const EachAnswer = (props) => {
  const ans = props.ans;
  const isFirst = props.isFirst;
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
  <React.Fragment>
    <div className="A-statement" data-testid="A-statement">
      <div>{<strong>{isFirst ? 'A: ' :<span>&nbsp; &nbsp; &nbsp;</span>}</strong>} {(readMore || abody.length < 70)? abody :`${abody.substring(0,40)} ...`}
        {(abody.length > 70) ?
        (<u data-testid = "ReadMore" onClick={()=>setReadMore(!readMore)}>{readMore ? <span data-testid= "notexpanded" style={{'fontSize':'18px',color:'black'}}>{'<<<hide'}</span>: <span data-testid= "expanded" style={{'fontSize':'18px',color:'black'}}>read more</span>}</u>)
        : null}
      </div>
    </div>
    <div className="A-date" data-testid="A-date">
      by {sellname !== "Seller" ? sellname :<strong style={{fontSize:'20px'}}>Seller</strong>}, {monthNames[month]} {day}, {year} &nbsp; | &nbsp; helpful?&nbsp; <u data-testid="helpfultest" onClick={addHelpful}>Yes</u> ({helpful}) &nbsp; | &nbsp; <u data-testid="report" onClick={addReport}>{reported ? 'Reported' : 'Report'}</u>
    </div>
  </React.Fragment>
  )
}