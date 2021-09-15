// React
import React from 'react';

// Utilities
import { serverRequests } from '../../../utils/serverRequests';

// Stylesheet
import './AddToCart.css'

export const AddToCart = (props) =>{

  const {sku, qty} = props;

  function clickHandler(){
    if (props.statusListener){
      props.statusListener( serverRequests.addToCart(sku[0], qty) );
    } else {
      serverRequests.addToCart(sku[0], qty);
    }
  }

  return (
    <button
      id='add-cart'
      data-testid='add-cart'
      onClick={clickHandler}
      disabled={ !sku || !qty }
    >
      ADD TO BAG
    </button>
  );
};