import React from 'react';
import { RatingsReviews } from './RatingsReviews';
import { ReviewsList } from './ReviewsList';

import {reviewsList} from '../../dummyData/reviewsList.js';

import {render, screen} from '@testing-library/react';
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

  it('should show the Show More button when review is over 250 characters', () => {
    expect( screen.queryByText(/Show More/) ).toBeTruthy();
    expect( screen.queryAllByText(/Show More/) ).toHaveLength(1);
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

describe('Ratings component', () => {
  test.todo('Ratings component is rendered');
  test.todo('Aggregate rating number is rendered');
  test.todo('"Percentage of reviews that recommend" is rendered');
  test.todo('"5-4-3-2-1" breakdown is rendered');
  test.todo('Average size rating is rendered');
  test.todo('Average comfort rating is rendered');

});