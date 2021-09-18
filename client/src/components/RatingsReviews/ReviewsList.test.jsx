
import React from 'react';
import { RatingsReviews } from './RatingsReviews';
import { ReviewsList } from './ReviewsList';
import {render, screen, fireEvent} from '@testing-library/react';
import { reviewsList } from '../../dummyData/reviewsList.js';

// Need to mock react's useContext (JUST useContext) to supply dummyReviewsMetadata

jest.mock('react', () => {
  const { dummyReviewsMetadata } = jest.requireActual('../../dummyData/reviewsMetadata');
  
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn().mockReturnValue({reviewsMetadata: dummyReviewsMetadata}),
  };
});

describe('ReviewsList component', () => {
  beforeEach(() => {
    render( <ReviewsList reviewslist={reviewsList} filter={{}} setFilter={() => {}} /> )
  });

  it('should always render max two Review components to start', () => {
    expect( screen.queryAllByTestId('Review') ).toHaveLength(2);
  });

  it('should render a More Reviews button where are more than two reviews', () => {
    expect( screen.queryByText(/More Reviews/) ).toBeTruthy();
  })

  it('should render two more reviews when the More Reviews button is clicked', () => {
    fireEvent.click(screen.queryByText(/More Reviews/))

    expect( screen.queryByText(/More Reviews/) ).toBeTruthy();
    expect( screen.queryAllByTestId('Review') ).toHaveLength(4);
  })

  it('should remove/hide the More Reviews button when there are further reviews to show', () => {
    // two clicks to show all reviews
    fireEvent.click(screen.queryByText(/More Reviews/))
    fireEvent.click(screen.queryByText(/More Reviews/))

    expect( screen.queryByText(/More Reviews/) ).toBeFalsy();
  });
});

describe('Filtering reviews', () => {
  beforeEach(() => {
    render( <RatingsReviews testing={true} /> );
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