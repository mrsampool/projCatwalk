import React from 'react';

import { StarRating } from './StarRating.jsx';

import { render, screen } from '@testing-library/react';

describe("Star Rating Defaults", ()=>{
  beforeEach(() => {
    render( <StarRating /> );
  });

  it('Should always render', () => {
    expect( screen.queryByTestId(/starrating/) ).toBeTruthy();
  });

  it('when rating average using default reviewsMetadata from context should be 3.6', () => {
    expect( screen.queryByText(/3.6 stars/) ).toBeTruthy();
  });

  test.todo('should always contain 5 stars');
  test.todo('stars should fill to nearest 1/4 to represent rating');
});

describe('Star Rating with props',() => {
  beforeEach(() => {
    render( <StarRating rating={3} /> );
  });

  it('should render rating/score based on the "rating" props', () => {
    expect( screen.queryByText(/^3 stars$/)).toBeTruthy();
  });
});