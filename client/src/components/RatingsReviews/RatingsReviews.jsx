import React, { useContext, useState, useEffect, createContext } from 'react';
import { ReviewsList } from './ReviewsList.jsx';
import { RatingsBreakdown } from './RatingsBreakdown.jsx';
import { ProductContext } from '../../contexts/ProductContext.js';
import { serverRequests } from '../../utils/serverRequests.js';
const { getProductReviews } = serverRequests;
import { dummyReviewsDataEmpty } from '../../dummyData/dummyReviewsData';
import { ReviewForm } from './ReviewForm.jsx';
import { Modal } from '../Modal/Modal.jsx';

import './styles/RatingsReviews.css';

export const ModalContext = React.createContext(null);

export const RatingsReviews = () =>{
  const [filter, setFilter] = useState({});
  const [reviewsData, setReviewsData] = useState(dummyReviewsDataEmpty);
  const [modalComponent, setModalComponent] = useState();
  const [sort, setSort] = useState('relevant');

  let childWidgets = null;
  
  const { reviewsMetadata, currentProduct } = useContext(ProductContext);

  useEffect(() => {
    getProductReviews(reviewsMetadata.product_id, sort)
    .then(data => {
      setReviewsData(data); 
    })
    .catch(err => console.log('Error in RatingsReviews getProductReviews(): ', err) );
  }, [reviewsMetadata, sort]); //

  const openReviewModal = () => {
    setModalComponent(<ReviewForm characteristics={reviewsMetadata.characteristics} productid={reviewsMetadata.product_id} productname={currentProduct.name} />);
  };

  if (reviewsData.results.length === 0) {
    childWidgets = (
      <p>There are currently no reviews for this product. Make sure to come back and write one when your purchase arrives!</p>
    );
  } else {
    childWidgets = (
      <div className='container-2-col'>
        <RatingsBreakdown filter={filter} setFilter={setFilter} />
        <ReviewsList reviewsdata={reviewsData} filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      </div>
    )
  }

  return (
  <div id='RatingsReviews' data-testid='RatingsReviews'>
    <h3>Ratings and Reviews</h3>
    <ModalContext.Provider value={{setModalComponent}} >
      {childWidgets}
      <div id='add-review-container'>
        <div>
          <button onClick={openReviewModal}>Add Your Review</button>
        </div>
      </div>
    </ModalContext.Provider>
    <Modal component={modalComponent} setComponent={setModalComponent} />
  </div>
  );
}
