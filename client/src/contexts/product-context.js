import React from 'react';

import { reviewsList } from '../dummyData/reviewsList.js';
import { answersList, listQuestions } from '../dummyData/anwsersList';
import { reviewsMeta } from '../dummyData/reviewsMetadata';

// create ProductContext with some default values.
// the changeProduct() function is actually implemented in App.jsx
export const ProductContext = React.createContext(
  {
    reviewsData: reviewsList,
    reviewsMetadata: reviewsMeta,
    questionsData: listQuestions,
    answersData: answersList,
    changeProduct: () => {}
  }
);