//React
import React from 'react';

//Stylesheet
import './Banner.css'

export const Banner = (props) =>{
  return(
    <div className='banner'>
      <nav>
        <a href='/' id='logo'>ASCENT SQUAD</a>
        <a href='/products'>PRODUCTS</a>
      </nav>
    </div>
  )
};