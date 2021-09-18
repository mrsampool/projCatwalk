import React, { useState } from 'react';
/*
import axios from 'axios';

import { reviewsList } from '../dummyData/reviewsList.js';
import { answersList, listQuestions } from '../dummyData/answersList';
import { reviewsMeta } from '../dummyData/reviewsMetadata';

const defaultState = {
  productID: 44391,
  reviewsData: reviewsList,
  reviewsMetadata: reviewsMeta,
  questionsData: listQuestions,
  answersData: answersList,
  setProductID: () => {}
}
*/

export const ProductContext = React.createContext(null);

export const ReviewsMetaContext = React.createContext(null);

export const QueryContext = React.createContext(null);
/*
export const ProductContextProvider = (props) => {

  const setProductID = (productID) => {
    if (productID) {
      setState({...state, productID});

      axios.get('/api/example/reviews/' + productID)
      .then( ({data}) => setState({...state, reviewsData: data}) )
      .then( () => axios.get('/api/example/questions'))
      .then( ({data}) => setState({...state, questionsData: data}) )
      .catch( err => console.log('Error from axios GET: ', err) );
    }
  }

  const initState = {
    ...defaultState,
    setProductID: setProductID
  }

  const [state, setState] = useState(initState);

  return (
    <ProductContext.Provider value={state}>
      {props.children}
    </ProductContext.Provider>
  );
}
*/
