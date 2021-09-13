import React from 'react';

export default function Review(props) {
  let reviewBody;
  if (props.review.body.length > 1000) {
    reviewBody = props.review.body.slice(0, 1000);
  } else {
    reviewBody = props.review.body;
  }

  return (
    <div id='Review' data-testid='Review' reviewid={props.review.review_id}>
      <p data-testid='reviewrating'>Rating: {props.review.rating}</p>
      <h3 data-testid='reviewsummary'>{props.review.summary}</h3>
      <h5 data-testid='reviewer_name'>{props.review.reviewer_name}</h5>
      <h5 data-testid='reviewdate'>{props.review.date}</h5>
      <p>{reviewBody}</p>
      <p>Recommend: {props.review.recommend ? 'True' : 'False'}</p>
      <p data-testid='reviewresponse'>{props.review.response}</p>
      <p>Helpfulness: {props.review.helpfulness}</p>
    </div>
  );
  
}