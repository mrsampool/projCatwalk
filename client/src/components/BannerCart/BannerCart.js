//React
import React, { useState, useEffect, useContext } from 'react';

//Sub-Components
import { Icon } from "../Icon/Icon.jsx";

//Context
import {CartContext} from "../../contexts/CartContext";

//Stylesheet
import './BannerCart.css'

export const BannerCart = (props) =>{

  const { cart } = useContext(CartContext);

  const [cartCount, setCartCount] = useState(0);

  function calcCartCount(){
    let cartCount = cart.reduce( (a,b) =>{
      return a + Number(b.count);
    }, 0);
    setCartCount(cartCount);
  }

  useEffect( ()=>{
    calcCartCount();
  }, [cart] );

  return (
    <a href='/cart' className='cart-link'>
      <Icon type='cart' color={'var(--light)'}/>
      <span id='cart-no'>{cartCount}</span>
    </a>
  )
};