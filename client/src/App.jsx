// Libraries
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// Sub-Components
import { Overview } from './components/Overview/Overview.jsx';
import { QAndA } from './components/QAndA/QAndA.jsx';
import { RatingsReviews } from './components/RatingsReviews/RatingsReviews.jsx';
import { Banner } from './components/Banner/Banner.jsx';
import { AnalyticWrapper } from './components/AnalyticWrapper/AnalyticWrapper.jsx';

// Dummy Data
import { listQuestions, answersList } from './dummyData/answersList';
import { productList, singleProduct, singleProductStyles } from './dummyData/productsList';
import { reviewsList } from './dummyData/reviewsList';
import { reviewsMeta } from './dummyData/reviewsMetadata';

// Contexts
import { ProductContext, QueryContext } from './contexts/product-context';

// Utilities
import { serverRequests } from './utils/serverRequests';
import { parseQueries } from './utils/parseQueries';

export const App = (props) => {

  let productId = 44388;
  let queries;

  if (useParams()){
    productId = useParams().productId;
  }
  if ( useLocation() ){
    queries = parseQueries( queries = useLocation().search );
  }

  let [currentProduct, setCurrentProduct] = useState(null);
  let [reviewsMetadata, setReviewsMetadata] = useState(null);
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
      console.log('no dummy');
      fetchProductData();
      fetchReviewsMeta();
    } else {
      setCurrentProduct( singleProduct );
      setReviewsMetadata( reviewsMeta );
    }
  }, []);

  return (
    <div id='App'>
      <ProductContext.Provider value={{currentProduct, reviewsMetadata}}>
        <QueryContext.Provider value={ queryParams }>
          <AnalyticWrapper>

            <Banner/>
            <Overview/>
            <QAndA />
            {/* <RatingsReviews /> */}

          </AnalyticWrapper>
        </QueryContext.Provider>
      </ProductContext.Provider>
    </div>
  );
};