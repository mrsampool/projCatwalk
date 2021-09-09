import React from 'react';
import { Overview } from './components/overview/overview.jsx';
import { QAndA } from './components/qAndA/qAndA.jsx';
import { RatingAndReview } from './components/ratingsReviews/ratingsReviews.jsx';
import { RelatedProducts } from './components/relatedProducts/relatedProducts.jsx';

export const App = () => {

  return (
    <div id='App'>
      <Overview />
      <RelatedProducts />
      <QAndA />
      <RatingAndReview />
    </div>
  );
};