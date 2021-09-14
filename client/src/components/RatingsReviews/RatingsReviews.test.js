import React from 'react';
import { RatingsReviews } from './RatingsReviews';
import { ReviewsList } from './ReviewsList';
import { RatingsBreakdown } from './RatingsBreakdown';

import {reviewsList} from '../../dummyData/reviewsList.js';

import {render, screen, fireEvent} from '@testing-library/react';
import { TestWatcher } from '@jest/core';



describe('Ratings and Reviews rendering', () => {

  beforeEach(() => {
    render( <RatingsReviews /> )
  });
  

  it('renders the RatingsReviews parent component', () => {
    let element = document.querySelector('#RatingsReviews');
    expect(element).toBeTruthy();
  });

  it('renders a ReviewList component', () => {
    let element = document.querySelector('#ReviewsList');
    expect(element).toBeTruthy();
  });

  
  it('renders a Review component', () => {
    let element = document.querySelector('#Review');
    expect(element).toBeTruthy();
  });
});

describe('Review component', () => {
  beforeEach(() => {
    render( <ReviewsList reviewslist={reviewsList}/> )
  });

  it('Test for rating', () => {
    expect( screen.queryByText(/Rating: 3/)).toBeTruthy();
  });

  it('Test for summary', () => {
    expect( screen.queryByText(/I'm enjoying wearing these shades/) ).toBeTruthy();
  });

  it('Test for date', () => {
    expect( screen.queryByText(/2019-04-14T00:00:00.000Z/) ).toBeTruthy();
  });

  it('Test for reviewer_name', () => {
    expect( screen.queryByText(/shortandsweeet/) ).toBeTruthy();
  });

  it('Test for body', () => {
    expect( screen.queryByText(/Sonic X-treme was a platform game/) ).toBeTruthy();
  });

  it('body should not show the dummy text beyond 1000 characters', () => {
    expect( screen.queryByText(/X-treme appeared in later games, such as Sonic Lost World/) ).toBeFalsy();
  });

  it('Test for recommend', () => {
    expect( screen.queryAllByText(/Recommend: False/) ).toHaveLength(2);
  });

  it('Test for response', () => {
    expect( screen.queryByText(/Some sort of response/) ).toBeTruthy();
  });

  it('Test for helpfulness', () => {
    expect( screen.queryAllByText(/Helpfulness: 5/) ).toHaveLength(2);
  });

  it('should not show beyond 250 characters in the body, initially', () => {
    expect( screen.queryByText(/magic rings from Tiara/) ).toBeFalsy();
  });

  it('should show the Show More button when review is over 250 characters', () => {
    expect( screen.queryByText(/Show More/) ).toBeTruthy();
    expect( screen.queryAllByText(/Show More/) ).toHaveLength(1);
  });

  it('should show the full review text when Show More is clicked', () => {
    fireEvent(
      screen.queryByText(/Show More/),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    expect( screen.queryByText(/magic rings from Tiara/) ).toBeTruthy();
  });
});

describe('ReviewsList component', () => {
  beforeEach(() => {
    render( <ReviewsList reviewslist={reviewsList}/> )
  });

  it('should render two Review components (according to dummy data)', () => {
    expect( screen.queryAllByTestId('Review') ).toHaveLength(2);
  });
});

describe('RatingsBreakdown component', () => {
  beforeEach(() => {
    render( <RatingsBreakdown />);
  });

  it('Ratings component is rendered', () => {
    expect( screen.queryByText(/Score: 3.5/) ).toBeTruthy();
  });

  it('StarRating component is rendered', () => {
    expect( screen.queryByTestId(/starrating/) ).toBeTruthy();
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
    expect( screen.queryAllByTestId(/starmeter/) ).toHaveLength(5);
  });

  it('Average size rating is rendered', () => {
    expect( screen.queryByTestId(/sizemeter/) ).toBeTruthy();
  });

  it('Average comfort rating is rendered', () => {
    expect( screen.queryByTestId(/comfortmeter/) ).toBeTruthy();
  });

});