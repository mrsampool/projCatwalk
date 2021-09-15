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

  it('default reviewsMetadata from context should be 3.6', () => {
    let meterValue = screen.queryByTestId(/starmeter/).attributes.getNamedItem('value').value;
    expect( meterValue ).toBe('3.6');
  });
  
});

describe('Star Rating with props',() => {
  beforeEach(() => {
    render( <StarRating rating={3} /> );
  });

  it('should render rating/score based on the "rating" props', () => {
    let meterValue = screen.queryByTestId(/starmeter/).attributes.getNamedItem('value').value;
    expect( meterValue ).toBe('3');
  });
});