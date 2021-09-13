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
    render( <RatingsReviews review={reviewsList.results[0]}/> )
  });

  it('Test for rating', () => {
    expect( screen.findByText(/Rating: 3/)).toBeTruthy();
  });

  it('Test for summary', () => {
    expect( screen.findByText(/I'm enjoying wearing these shades/) ).toBeTruthy();
  });

  it('Test for date', () => {
    expect( screen.getByText(/2019-04-14T00:00:00.000Z/) ).toBeTruthy();
  });

  it('Test for reviewer_name', () => {
    expect( screen.getByText(/shortandsweeet/) ).toBeTruthy();
  });

  it('Test for body', () => {
    expect( screen.findByText(/Comfortable and practical./) ).toBeTruthy();
  });

  it('Test for recommend', () => {
    expect( screen.findByText(/Recommend: False/) ).toBeTruthy();
  });

  it('Test for response', () => {
    expect( screen.findByText(/Some sort of response/) ).toBeTruthy();
  });

  it('Test for helpfulness', () => {
    expect( screen.findByText(/Helpfulness: 5/) ).toBeTruthy();
  });
});

describe('ReviewList component', () => {
  beforeEach(() => {
    render( <ReviewsList reviewslist={reviewsList}/> )
  });

  it('should render two Review components (according to dummy data)', () => {
    expect( screen.getAllByTestId('Review') ).toHaveLength(2);
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