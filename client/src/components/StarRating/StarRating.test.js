import React from 'react';

import { StarRating } from './StarRating.jsx';
import { Icon } from '../Icon/Icon.jsx';

import { render, screen } from '@testing-library/react';

// use dummyReviewsMetadata for these tests
jest.mock('react', () => {
  const { dummyReviewsMetadata } = jest.requireActual('../../dummyData/dummyReviewsMetadata');
  
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn().mockReturnValue({reviewsMetadata: dummyReviewsMetadata}),
  };
});

jest.mock('../Icon/Icon.jsx', () => {
  return {
    Icon: jest.fn().mockReturnValue(<div data-testid='mockIcon'></div>),
  }
});

describe("Star Rating Defaults", ()=>{
  beforeEach(() => {
    render( <StarRating /> );
  });

  it('should render 5 <Icon /> components', () => {
    expect( screen.queryAllByTestId(/mockIcon/).length ).toBe(5);

    expect( Icon.mock.calls.length  ).toBe(5);
    expect( screen.queryAllByTestId(/mockIcon/).length ).toBe(5);
  });
  
});

describe('Star Rating with props.rating',() => {
  beforeEach(() => {
    render( <StarRating rating={3} /> );
  });

  it('when props.rating exists, it should render that rating/score', () => {
    expect( Icon.mock.calls.length ).toBe(5);
    expect( screen.queryAllByTestId(/mockIcon/).length ).toBe(5);
  });
});
