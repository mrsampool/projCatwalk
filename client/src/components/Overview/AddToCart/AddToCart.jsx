// React
import React, {useContext} from 'react';

// Utilities
import { serverRequests } from '../../../utils/serverRequests';

// Stylesheet
import './AddToCart.css'
import {CartContext} from "../../../contexts/CartContext";
import {ProductContext} from "../../../contexts/ProductContext";

export const AddToCart = (props) =>{

  const { cartAccess } = useContext(CartContext);
  const { currentProduct } = useContext(ProductContext);

  const {sku, qty, style} = props;

  function clickHandler(){
    cartAccess.addItem(currentProduct, style, sku, qty);
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