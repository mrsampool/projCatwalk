// Libraries
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

// Sub-Components
import { Overview } from '../../components/Overview/Overview.jsx';
import { QAndA } from '../../components/QAndA/QAndA.jsx';
import { RatingsReviews } from '../../components/RatingsReviews/RatingsReviews.jsx';
import { AnalyticWrapper } from '../../components/AnalyticWrapper/AnalyticWrapper.jsx';
import { RelatedProducts } from '../../components/RelatedProducts/RelatedProducts.jsx';

// Dummy Data
import { singleProduct } from '../../dummyData/productsList';
import { dummyReviewsMetadata } from '../../dummyData/dummyReviewsMetadata';

// Contexts
import { ProductContext } from '../../contexts/ProductContext';
import {QueryContext} from "../../contexts/QueryContext";

// Utilities
import { serverRequests } from '../../utils/serverRequests';

// Style Sheet
import './ProductDetail.css';

export const ProductDetail = (props) => {

  let productId = useParams().productId || 44388;
  let queryParams = useContext(QueryContext);

  let [currentProduct, setCurrentProduct] = useState(null);
  let [reviewsMetadata, setReviewsMetadata] = useState(dummyReviewsMetadata);

  function fetchProductData(){
    serverRequests.getProductById(productId)
    .then( productData => setCurrentProduct(productData) )
    .catch( err => console.log(err) );
  }

  function fetchReviewsMeta(){
    serverRequests.getProductReviewsMeta(productId)
    .then( reviewsMeta => setReviewsMetadata(reviewsMeta) )
    .catch( err => console.log(err) );
  }

  useEffect( ()=>{
    if (queryParams.noDummy){
      fetchProductData();
      fetchReviewsMeta();
    } else {
      setCurrentProduct( singleProduct );
      setReviewsMetadata( dummyReviewsMetadata );
    }
  }, []);

  return (
    <div id='App'>
      <ProductContext.Provider value={{currentProduct, reviewsMetadata }}>
        <AnalyticWrapper>

          <Overview/>

          <div id='product-etc'>
            <RelatedProducts/>
            <QAndA />
            <RatingsReviews />
          </div>

        </AnalyticWrapper>
      </ProductContext.Provider>
    </div>
  );
};