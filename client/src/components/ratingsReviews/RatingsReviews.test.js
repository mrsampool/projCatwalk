import React from 'react';
import { RatingsReviews } from './RatingsReviews';

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
    let element = document.querySelector('#ReviewList');
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
  test.todo('Test for reviewer_name');

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
  test.todo('discover items to test');
});