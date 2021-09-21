import React, {useState, useContext} from 'react';
import { StarRating } from '../StarRating/StarRating.jsx';
import { ModalContext } from './RatingsReviews.jsx';
import { serverRequests } from '../../utils/serverRequests.js';
const { putReviewHelpful, putReviewReport } = serverRequests;
import { Icon } from '../Icon/Icon.jsx';

import './styles/Review.css';

export default function Review(props) {
  let feedBackKey = props.review.review_id + '_feedback';
  let [reviewBody, setReviewBody] = useState('');
  let [reviewFeedback, setReviewFeedback] = useState( localStorage.getItem(feedBackKey) );

  let fullBody;
  let showMoreBtn = null;
  let feedbackElements = null;
  let reviewDate = new Date(props.review.date);
  let staffResponse = null;
  const { setModalComponent } = useContext(ModalContext);

  if (props.review.body.length > 1000) {
    fullBody = props.review.body.slice(0, 1000);
  } else {
    fullBody = props.review.body;
  }

  if (fullBody.length > 250 && reviewBody === '') {
    reviewBody = fullBody.slice(0, 250);
    showMoreBtn = (
      <><button onClick={() => setReviewBody(fullBody)} data-testid='showMoreBtn'>Show More</button><br></br></>
    );
  }

  if (fullBody.length <= 250) {
    reviewBody = fullBody;
  }

  const thumbClickHandler = (e) => {
    console.log(e.target);
    console.log(e.target.src);
    setModalComponent(<img src={e.target.src} style={{maxHeight: '90%', maxWidth: '90%'}}></img>)
  }

  const reviewReportHandler = (review_id) => {
    if(reviewFeedback === null) {
      putReviewReport(review_id)
      .then(() => {
        localStorage.setItem(feedBackKey, 'reported');
        setReviewFeedback('reported');
      })
      .catch(err => console.log('Error reporting review: ', err));;
    }
  }

  const reviewHelpfulHandler = (review_id) => {
    if(reviewFeedback === null) {
      putReviewHelpful(review_id)
      .then(() => {
        localStorage.setItem(feedBackKey, 'helpful');
        setReviewFeedback('helpful');
      })
      .catch(err => console.log('Error marking review as helpful: ', err));
    }
  }

  if (reviewFeedback === 'helpful') {
    feedbackElements = (
      <p>You marked this review as helpful.</p>
    );
  }
  if (reviewFeedback === 'reported') {
    feedbackElements = (
     <p>You reported this review.</p>
    );
  }
  if (reviewFeedback === null) {
    feedbackElements = (
      <p>Helpful?&nbsp;&nbsp;<span onClick={() => reviewHelpfulHandler(props.review.review_id)} ><u>Yes</u>&nbsp;{'(' + props.review.helpfulness + ')'}</span><span> | </span><span onClick={() => reviewReportHandler(props.review.review_id)}><u>Report</u></span></p>
    )
  }

  if (props.review.response !== null && props.review.response !== '') {
    staffResponse = (
      <><div style={{backgroundColor: 'var(--light)'}}><p data-testid='reviewresponse'>Staff Response:<br></br>{props.review.response}</p></div><br></br></>
      )
  }

  return (
    <div id='Review' data-testid='Review' reviewid={props.review.review_id}>
      <div style={{display: 'grid', gridTemplateColumns: '5rem 1fr 1fr'}}>
        <StarRating rating={props.review.rating} />
        <h5 className='review-author' data-testid='reviewer_name'>{props.review.reviewer_name}</h5>
        <h5 className='review-author' data-testid='reviewdate'>{reviewDate.toDateString()}</h5>
      </div><br></br>
      <h3 className='review-summary' data-testid='reviewsummary'>{props.review.summary}</h3>
      <br></br>
      <p>{reviewBody}</p>
      <br></br>
      {showMoreBtn}
      {props.review.recommend ? (<><p><Icon type='check' size='1rem' />&nbsp;&nbsp;I recommend this product</p><br></br></>) : null}
      {staffResponse}
      <div className='container-review-thumbs'>
        {props.review.photos.map((photoObj) => {return (
          <div className='container-img-thumb' key={photoObj.id} ><img src={photoObj.url} onClick={thumbClickHandler}></img></div>
        )})}
      </div>
      {props.review.photos.length > 0 ? <br></br> : null}
      {feedbackElements}
      {reviewFeedback ? (<p>Thank you for your feedback!</p>) : null}
      <hr></hr>
    </div>
  );
  
}