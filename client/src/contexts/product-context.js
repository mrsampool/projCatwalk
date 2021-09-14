import React, { useState } from 'react';
import axios from 'axios';

import { reviewsList } from '../dummyData/reviewsList.js';
import { answersList, listQuestions } from '../dummyData/anwsersList';
import { reviewsMeta } from '../dummyData/reviewsMetadata';

const defaultState = {
  productID: 0,
  reviewsData: reviewsList,
  reviewsMetadata: reviewsMeta,
  questionsData: listQuestions,
  answersData: answersList,
  setProductID: () => {}
}

export const ProductContext = React.createContext(defaultState);

export const ProductContextProvider = (props) => {

  const setProductID = (product_id) => {
    if (product_id) {
      axios.get('/api/example/reviews/' + product_id)
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
