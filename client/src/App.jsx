import React from 'react';
import { Overview } from './components/overview/overview.jsx';
import { QAndA } from './components/qAndA/qAndA.jsx';
import { RatingsReviews } from './components/ratingsReviews/RatingsReviews.jsx';
import { RelatedProducts } from './components/relatedProducts/relatedProducts.jsx';

export const App = () => {

  return (
    <div id='App'>
      <Overview />
      <RelatedProducts />
      <QAndA />
      <RatingsReviews />
    </div>
  );
};