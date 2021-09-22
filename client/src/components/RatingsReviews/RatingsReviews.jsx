import React, { useContext, useState, useEffect, createContext } from 'react';
import { ReviewsList } from './ReviewsList.jsx';
import { RatingsBreakdown } from './RatingsBreakdown.jsx';
import { ProductContext } from '../../contexts/ProductContext.js';
import { serverRequests } from '../../utils/serverRequests.js';
const { getProductReviews } = serverRequests;
import { dummyReviewsData } from '../../dummyData/dummyReviewsData';
import { ReviewForm } from './ReviewForm.jsx';
import { Modal } from '../Modal/Modal.jsx';

import './styles/RatingsReviews.css';

export const ModalContext = React.createContext(null);

export const RatingsReviews = (props) =>{
  const [filter, setFilter] = useState({});
  const [reviewsData, setReviewsData] = useState(dummyReviewsData);
  const [modalComponent, setModalComponent] = useState();
  const [sort, setSort] = useState('relevant');
  
  let { reviewsMetadata, currentProduct } = useContext(ProductContext);

  useEffect(() => {
    getProductReviews(reviewsMetadata.product_id, sort)
    .then(data => {
      setReviewsData(data); 
    })
    .catch(err => console.log('Error in RatingsReviews getProductReviews(): ', err) );
  }, [reviewsMetadata, sort]);

  const openReviewModal = () => {
    setModalComponent(<ReviewForm characteristics={reviewsMetadata.characteristics} productid={reviewsMetadata.product_id} productname={currentProduct.name} />);
  };

  return (
  <div id='RatingsReviews' data-testid='RatingsReviews'>
    <h3>Ratings and Reviews</h3>
    <ModalContext.Provider value={{setModalComponent}} >
    {reviewsData.results.length === 0 ? null : (
      <div className='container-2-col'>
        <RatingsBreakdown filter={filter} setFilter={setFilter} />
        <ReviewsList reviewsdata={reviewsData} filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      </div>
    )}
    </ModalContext.Provider>
    <div id='add-review-container'>
      <div>
        <button onClick={openReviewModal}>Add Your Review</button>
      </div>
    </div>
    <Modal component={modalComponent} setComponent={setModalComponent} />
  </div>
  );
}