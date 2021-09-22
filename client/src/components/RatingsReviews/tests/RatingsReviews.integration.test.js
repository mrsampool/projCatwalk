import React, { useContext } from 'react';
import { act } from 'react-dom/test-utils';
import { RatingsReviews } from '../RatingsReviews.jsx';
import { ReviewsList } from '../ReviewsList.jsx';
import { RatingsBreakdown } from '../RatingsBreakdown.jsx';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {serverRequests} from '../../../utils/serverRequests.js';
let { getProductReviews } = serverRequests;

jest.mock('../../../utils/serverRequests.js');

jest.mock('react', () => {
  const { dummyReviewsMetadata } = jest.requireActual('../../../dummyData/dummyReviewsMetadata');
  
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn().mockReturnValue({reviewsMetadata: dummyReviewsMetadata}),
  };
});


describe('Filtering reviews (integration test)', () => {
  beforeEach(() => {
    render( <RatingsReviews /> );
  });

  it('should only show 4 star reviews when the 4 star label is clicked', () => {
    fireEvent(
      screen.queryByText(/^4 stars$/),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect( screen.queryByText(/Sonic X-treme was a platform game/) ).toBeFalsy();
    expect( screen.queryByText(/They are very dark. But that's good/) ).toBeTruthy();
  });

  it('should only show 3 star reviews when the 3 star label is clicked', () => {
    fireEvent(
      screen.queryByText(/^3 stars$/),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect( screen.queryByText(/They are very dark. But that's good/) ).toBeFalsy();
    expect( screen.queryByText(/Sonic X-treme was a platform game/) ).toBeTruthy();
  });

  it('should restore 3 star reviews when the 3 star label is clicked a second time', () => {
    fireEvent(
      screen.queryByText(/^3 stars$/),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect( screen.queryByText(/They are very dark. But that's good/) ).toBeFalsy();
    expect( screen.queryByText(/Sonic X-treme was a platform game/) ).toBeTruthy();

    fireEvent(
      screen.queryByText(/^3 stars$/),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect( screen.queryByText(/They are very dark. But that's good/) ).toBeTruthy();
    expect( screen.queryByText(/Sonic X-treme was a platform game/) ).toBeTruthy();
  });

  it('should clear all filters when the Clear Filter button is clicked', () => {
    fireEvent(
      screen.queryByText(/^3 stars$/),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect( screen.queryByText(/They are very dark. But that's good/) ).toBeFalsy();
    expect( screen.queryByText(/Sonic X-treme was a platform game/) ).toBeTruthy();

    fireEvent(
      screen.queryByText(/^Clear filters$/),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect( screen.queryByText(/They are very dark. But that's good/) ).toBeTruthy();
    expect( screen.queryByText(/Sonic X-treme was a platform game/) ).toBeTruthy();
  });

  it('"Clear filters" button should appear only when filters are applied', () => {
    expect( screen.queryByText(/Clear filters/) ).toBeFalsy();
    
    fireEvent(
      screen.queryByText(/^3 stars$/),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect( screen.queryByText(/Clear filters/) ).toBeTruthy();

    fireEvent(
      screen.queryByText(/^Clear filters$/),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect( screen.queryByText(/Clear filters/) ).toBeFalsy();
  });
});