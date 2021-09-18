import React from 'react';
import { RatingsBreakdown } from './RatingsBreakdown';
import {render, screen} from '@testing-library/react';

jest.mock('react', () => {
  const { dummyReviewsMetadata } = jest.requireActual('../../dummyData/reviewsMetadata');
  
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn().mockReturnValue({reviewsMetadata: dummyReviewsMetadata}),
  };
});

describe('RatingsBreakdown component', () => {
  beforeEach(() => {
    render( <RatingsBreakdown filter={{}} />);
  });

  it('Overall average review score is rendered', () => {
    expect( screen.queryByText(/Score: 3.6/) ).toBeTruthy();
  });

  it('StarRating component is rendered', () => {
    expect( screen.queryByTestId(/starrating/) ).toBeTruthy();
    expect( screen.queryByTestId(/starmeter/) ).toBeTruthy();
  });
  
  it('"Percentage of reviews that recommend" is rendered', () => {
    expect( screen.queryByText(/% of reviews recommended/) ).toBeTruthy();
  });

  it('"5-4-3-2-1" star breakdown is rendered', () => {
    expect( screen.queryByText(/^5 stars$/) ).toBeTruthy();
    expect( screen.queryByText(/^4 stars$/) ).toBeTruthy();
    expect( screen.queryByText(/^3 stars$/) ).toBeTruthy();
    expect( screen.queryByText(/^2 stars$/) ).toBeTruthy();
    expect( screen.queryByText(/^1 stars$/) ).toBeTruthy();
    expect( screen.queryAllByTestId(/starcountmeter/) ).toHaveLength(5);
  });

  it('Average size rating is rendered', () => {
    expect( screen.queryByTestId(/sizemeter/) ).toBeTruthy();
  });

  it('Average comfort rating is rendered', () => {
    expect( screen.queryByTestId(/comfortmeter/) ).toBeTruthy();
  });

});