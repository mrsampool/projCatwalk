import React from 'react';

import { StarRating } from './StarRating.jsx';

import { render, screen } from '@testing-library/react';
import {reviewsList} from '../../dummyData/reviewsList';


describe("Star Rating", ()=>{
  beforeEach(() => {
    render( <StarRating /> );
  });

  it('Should always render', () => {
    expect( screen.getByTestId(/starrating/) ).toBeTruthy();
  });

  it('rating average (using reviewsList dummy data) should be 3.5', () => {
    expect( screen.getByText(/3.5 stars/) ).toBeTruthy();
  });

  test.todo('should always contain 5 stars');
  test.todo('stars should fill to nearest 1/4 to represent rating');
});