import React from 'react';
import { act } from 'react-dom/test-utils';
import { RatingsReviews } from './RatingsReviews';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {serverRequests} from '../../utils/serverRequests.js';

jest.mock('../../utils/serverRequests.js');

jest.mock('react', () => {
  const { dummyReviewsMetadata } = jest.requireActual('../../dummyData/dummyReviewsMetadata');
  
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn().mockReturnValue({reviewsMetadata: dummyReviewsMetadata}),
  };
});

describe('Ratings and Reviews rendering', () => {

  beforeEach(() => {
    act(() => {
      render(<RatingsReviews />);
    });
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

describe('Sorting of Reviews (API calls include "sort" parameter and correct value', () => {
  beforeEach(() => {
    act(() => {
      render(<RatingsReviews />);
    });
  });
  
  it('should default to sorting reviews by "relevant"', (done) => {

    // order of the dropdown options
    let dropdown = screen.queryByTestId('select');
    expect( dropdown.children[0].textContent ).toBe('Relevant');
    expect( dropdown.children[1].textContent ).toBe('Newest');
    expect( dropdown.children[2].textContent ).toBe('Helpful');

    // first option is selected by default
    expect( dropdown.children[0].selected ).toBeTruthy();
    expect( dropdown.children[1].selected ).toBeFalsy()
    expect( dropdown.children[2].selected ).toBeFalsy();
    
    // there is always at least one getProductReviews call due to initial render
    waitFor(() => {
      let element = screen.queryAllByTestId('reviewsummary');
      expect( element[0].innerHTML ).toMatch(/I am resolved data/);
      expect( serverRequests.getProductReviews.mock.calls[0][1] ).toBe('relevant');
      expect( serverRequests.getProductReviews.mock.calls.length ).toBe(1);
    })
    .then(() => {
      done();
    })
  });
  
  it('when "helpful" is selected, reviews are sorted from most to least helpful', (done) => {
    
    let dropdown = screen.queryByTestId('select');
    act(() => {
      // 'value' should be the *key* of the desired option
      fireEvent.change( dropdown, {target: {value: 'helpful'}} ); // 'Helpful'
    })    
    
    expect( dropdown.children[0].selected ).toBeFalsy();
    expect( dropdown.children[2].selected ).toBeTruthy();

    // the *second* call of getProductReviews (after the call during initial render) should
    // be the one that has the parameter we expect
    waitFor(() => {
      let element = screen.queryAllByTestId('reviewsummary');
      expect( element[0].innerHTML ).toMatch(/I am resolved data/);
      expect( serverRequests.getProductReviews.mock.calls[1][1] ).toBe('helpful');
      expect( serverRequests.getProductReviews.mock.calls.length ).toBe(2);
    })
    .then(() => {
      done();
    })
  });

  it('when "newest" is selected, most recent review appears first', (done) => {

    let dropdown = screen.queryByTestId('select');
    act(() => {
      // 'value' should be the *key* of the desired option
      fireEvent.change( dropdown, {target: {value: 'newest'}} ); // 'Newst'
    })    
    
    expect( dropdown.children[0].selected ).toBeFalsy();
    expect( dropdown.children[1].selected ).toBeTruthy();

    waitFor(() => {
      let element = screen.queryAllByTestId('reviewsummary');
      expect( element[0].innerHTML ).toMatch(/I am resolved data/);
      expect( serverRequests.getProductReviews.mock.calls[1][1] ).toBe('newest');
      expect( serverRequests.getProductReviews.mock.calls.length ).toBe(2);
    })
    .then(() => {
      done();
    });
  });
});