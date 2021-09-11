import React from 'react';

export default function Review(props) {
  return (
    <div id='Review' reviewid={props.review.review_id}>
      <p data-testid='reviewrating'>Rating: {props.review.rating}</p>
      <h3 data-testid='reviewsummary'>{props.review.summary}</h3>
      <h5 data-testid='reviewer_name'>{props.review.reviewer_name}</h5>
      <h5 data-testid='reviewdate'>{props.review.date}</h5>
      <p>{props.review.body}</p>
      <p>Recommend: {props.review.recommend ? 'True' : 'False'}</p>
      <p data-testid='reviewresponse'>{props.review.response}</p>
      <p>Helpfulness: {props.review.helpfulness}</p>
    </div>
  );
  
}