// Libraries
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// Sub-Components
import { Overview } from './components/Overview/Overview.jsx';
import { QAndA } from './components/QAndA/QAndA.jsx';
import { RatingsReviews } from './components/RatingsReviews/RatingsReviews.jsx';
import { Banner } from './components/Banner/Banner.jsx';
import { AnalyticWrapper } from './components/AnalyticWrapper/AnalyticWrapper.jsx';
import { RelatedProducts } from './components/RelatedProducts/RelatedProducts.jsx';

// Dummy Data
import { listQuestions, answersList } from './dummyData/answersList';
import { productList, singleProduct, singleProductStyles } from './dummyData/productsList';
import { dummyReviewsMetadata } from './dummyData/reviewsMetadata';

// Contexts
import { ProductContext, QueryContext } from './contexts/product-context';

// Utilities
import { serverRequests } from './utils/serverRequests';
import { parseQueries } from './utils/parseQueries';

// Style Sheet
import './App.css';

export const App = (props) => {

  let productId = useParams().productId || 44388;
  let queries = parseQueries( useLocation().search );

  let [currentProduct, setCurrentProduct] = useState(null);
  let [reviewsMetadata, setReviewsMetadata] = useState(dummyReviewsMetadata);
  let [queryParams, setQueryParams] = useState(queries || {});

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
      <ProductContext.Provider value={{currentProduct, reviewsMetadata}}>
        <QueryContext.Provider value={ queryParams }>
          <AnalyticWrapper>

            <Banner/>
            <Overview/>
            <div id='product-etc'>
              <RelatedProducts/>
              <QAndA />
              <RatingsReviews />
            </div>

          </AnalyticWrapper>
        </QueryContext.Provider>
      </ProductContext.Provider>
    </div>
  );
};