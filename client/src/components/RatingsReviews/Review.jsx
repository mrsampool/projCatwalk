import React, {useState} from 'react';
import { StarRating } from '../StarRating/StarRating.jsx';

export default function Review(props) {
  var [reviewBody, setReviewBody] = useState('');
  let fullBody;
  let showMoreBtn = null;

  if (props.review.body.length > 1000) {
    fullBody = props.review.body.slice(0, 1000);
  } else {
    fullBody = props.review.body;
  }

  if (fullBody.length > 250 && reviewBody === '') {
    reviewBody = fullBody.slice(0, 250);
    showMoreBtn = (
      <button onClick={() => setReviewBody(fullBody)} data-testid='showMoreBtn'>Show More</button>
    );
  }

  if (fullBody.length <= 250) {
    reviewBody = fullBody;
  }

  return (
    <div id='Review' data-testid='Review' reviewid={props.review.review_id}>
      <StarRating rating={props.review.rating} />
      <h3 data-testid='reviewsummary'>{props.review.summary}</h3>
      <h5 data-testid='reviewer_name'>{props.review.reviewer_name}</h5>
      <h5 data-testid='reviewdate'>{props.review.date}</h5>
      <p>{reviewBody}</p>
      {showMoreBtn}
      <p>Recommend: {props.review.recommend ? 'True' : 'False'}</p>
      <p data-testid='reviewresponse'>{props.review.response}</p>
      <p>Helpfulness: {props.review.helpfulness}</p>
    </div>
  );
  
}