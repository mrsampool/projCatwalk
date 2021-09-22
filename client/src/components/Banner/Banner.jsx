//React
import React from 'react';

//Stylesheet
import './Banner.css'
import {BannerCart} from "../BannerCart/BannerCart";

export const Banner = (props) =>{
  return(
    <div className='banner'>
      <nav>
        <a href='/' id='logo'>ASCENT SQUAD</a>
        <a href='/products'>PRODUCTS</a>
        <BannerCart/>
      </nav>
    </div>
  )
};