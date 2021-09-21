import React, { useContext } from 'react';
import { RatingsBreakdown } from '../RatingsBreakdown';
import {render, screen, cleanup} from '@testing-library/react';
import { dummyReviewsMetadata2 } from '../../../dummyData/dummyReviewsMetadata';

// RatingsBreakdown gets data from a Context, so pass in dummy data
// through that Context.
jest.mock('react', () => {
  const { dummyReviewsMetadata } = jest.requireActual('../../../dummyData/dummyReviewsMetadata');
  
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn().mockReturnValue({reviewsMetadata: dummyReviewsMetadata}),
  };
});

jest.mock('../../StarRating/StarRating.jsx', () => {
  return {
    StarRating: () => {
      return (<div data-testid='mockStarRating'></div>)
    },
  }
})

describe('RatingsBreakdown unit test', () => {
  beforeEach(() => {
    render( <RatingsBreakdown filter={{}} />);
  });

  
  it('Overall average review score is rendered', () => {

    // average.toFixed(1) is used, which rounds the number as well as
    // limiting the value to 1 decimal place
    expect( screen.queryByText(/3.6/) ).toBeTruthy();
  });
  
  it('StarRating component is used', () => {
    expect( screen.queryByTestId(/mockStarRating/) ).toBeTruthy();
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

  it('Displayed factors/characteristics depend on what exists in data', () => {
    expect( screen.queryByText(/Size/) ).toBeTruthy();
    expect( screen.queryByText(/Width/) ).toBeTruthy();
    expect( screen.queryByText(/Comfort/) ).toBeTruthy();
    expect( screen.queryByText(/Quality/) ).toBeFalsy();
    expect( screen.queryByText(/Length/) ).toBeFalsy();
  });

  it('should depend on the data from useContext', () => {
    // beforeEach is being used, to clear that render() first:
    cleanup();
    // use a different set of dummy data, and check for that
    useContext.mockReturnValue({reviewsMetadata: dummyReviewsMetadata2});
    render( <RatingsBreakdown filter={{}} /> );

    expect( screen.queryByText(/3.3/) ).toBeTruthy();
    expect( screen.queryByText(/Quality/) ).toBeTruthy();
    expect( screen.queryByText(/Comfort/) ).toBeFalsy();
  });

});