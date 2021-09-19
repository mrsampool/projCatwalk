import React, {useState, useContext} from 'react';
import { StarRating } from '../StarRating/StarRating.jsx';
import { ModalContext } from './RatingsReviews.jsx';

import './Review.css';

export default function Review(props) {
  var [reviewBody, setReviewBody] = useState('');
  let fullBody;
  let showMoreBtn = null;
  const { setModalComponent } = useContext(ModalContext);

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

  const thumbClickHandler = (e) => {
    console.log(e.target);
    console.log(e.target.src);
    setModalComponent(<img src={e.target.src} style={{maxHeight: '90%', maxWidth: '90%'}}></img>)
  }

  return (
    <div id='Review' data-testid='Review' reviewid={props.review.review_id}>
      <StarRating rating={props.review.rating} />
      <h5 data-testid='reviewer_name'>{props.review.reviewer_name}</h5>
      <h5 data-testid='reviewdate'>{props.review.date}</h5>
      <h3 data-testid='reviewsummary'>{props.review.summary}</h3>
      <p>{reviewBody}</p>
      {showMoreBtn}
      <p>Recommend: {props.review.recommend ? 'True' : 'False'}</p>
      <p data-testid='reviewresponse'>{props.review.response}</p>
      <p>Helpfulness: {props.review.helpfulness}</p>
      <div className='container-review-thumbs'>
        {props.review.photos.map((photoObj) => {return (
          <div className='container-img-thumb' key={photoObj.id} ><img src={photoObj.url} onClick={thumbClickHandler}></img></div>
        )})}
      </div>
    </div>
  );
  
}