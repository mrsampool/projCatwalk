//React
import React, { useState, useEffect, useContext } from 'react';

//Sub-Components
import { Icon } from "../Icon/Icon.jsx";

//Context
import {CartContext} from "../../contexts/CartContext";

//Stylesheet
import './BannerCart.css'

export const BannerCart = (props) =>{

  const { cartAccess } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(cartAccess.size);
  cartAccess.sizeStateSetter = setCartCount;

  return (
    <a href='/cart' className='cart-link'>
      <Icon type='cart' color={'var(--light)'}/>
      <span id='cart-no'>{cartCount}</span>
    </a>
  )
};