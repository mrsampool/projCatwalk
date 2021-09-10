import React from 'react';
import {render, screen} from '@testing-library/react';

import { RatingsReviews } from './RatingsReviews';



describe('Ratings and Reviews', () => {
  
  beforeEach(() => {
    render( <RatingsReviews /> );
  });

  it('renders the RatingsReviews parent component', () => {
    let element = screen.getByText(/RatingsReviews component/i);
    expect(element).toBeTruthy();
  });

  it('renders a ReviewList component', () => {
    let element = screen.getByText(/reviewlist component/i);
    expect(element).toBeTruthy();
  });

  
  it('renders a Review component', () => {
    let element = screen.getByText(/review component/i);
    expect(element).toBeTruthy();
  });
});
