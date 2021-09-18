import React from 'react';

import './Landing.css';

import { Banner } from '../../components/Banner/Banner.jsx';

export const Landing = props => {
  return(
    <div id='Landing'>
      <Banner/>
      <a href='/products' id='landing-shop'>Shop</a>
      <img
        id='LandingImg'
        src="https://images.pexels.com/photos/1674118/pexels-photo-1674118.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
      />
    </div>
  )
}