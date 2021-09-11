import React from 'react';
import {render} from '@testing-library/react';

import { RatingsReviews } from './RatingsReviews';



describe('Ratings and Reviews', () => {

  beforeEach(() => {
    render( <RatingsReviews /> )
  });
  

  it('renders the RatingsReviews parent component', () => {
    let element = document.querySelector('#RatingsReviews');
    expect(element).toBeTruthy();
  });

  it('renders a ReviewList component', () => {
    let element = document.querySelector('#ReviewList');
    expect(element).toBeTruthy();
  });

  
  it('renders a Review component', () => {
    let element = document.querySelector('#Review');
    expect(element).toBeTruthy();
  });
});
