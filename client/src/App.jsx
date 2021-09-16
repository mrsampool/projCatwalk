// Libraries
import React, { useState } from 'react';

// Sub-Components
import { Overview } from './components/Overview/Overview.jsx';
import { QAndA } from './components/QAndA/QAndA.jsx';
import { RatingsReviews } from './components/RatingsReviews/RatingsReviews.jsx';
import { Modal } from './components/Modal/Modal.jsx';
import { Banner } from './components/Banner/Banner.jsx';

// Dummy Data
import { listQuestions, answersList } from './dummyData/answersList';
import { productList, singleProduct, singleProductStyles } from './dummyData/productsList';
import { reviewsList } from './dummyData/reviewsList';
import { reviewsMeta } from './dummyData/reviewsMetadata';
import { AnalyticWrapper } from './components/AnalyticWrapper/AnalyticWrapper.jsx';

// Contexts
import { ProductContext, ProductContextProvider } from './contexts/product-context.js';
import { ModalContext } from './contexts/modal-context';

export const App = () => {

  // States
  let [modalComponent, setModalComponent] = useState(null);

  return (
    <div id='App'>
      <ProductContextProvider>
        <ModalContext.Provider value={{ modalComponent, setModalComponent }}>
          <Modal />
          <AnalyticWrapper>
            <Banner/>
            <Overview product={singleProduct} styles={singleProductStyles}/>
            <QAndA />
            <RatingsReviews />
          </AnalyticWrapper>
        </ModalContext.Provider>
      </ProductContextProvider>
    </div>
  );
};