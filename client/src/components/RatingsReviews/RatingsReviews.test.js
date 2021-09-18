import React from 'react';
import { act } from 'react-dom/test-utils';
import { RatingsReviews } from './RatingsReviews';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {serverRequests} from '../../utils/serverRequests.js';

jest.mock('../../utils/serverRequests.js')

describe('Ratings and Reviews rendering', () => {

  beforeEach(() => {
    render( <RatingsReviews testing={true} /> )
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
  
  it('should default to sorting reviews by "relevant"', (done) => {
    act(() => {
      render(<RatingsReviews />);
    });

    // order of the dropdown options
    let dropdown = screen.queryByTestId('select');
    expect( dropdown.children[0].textContent ).toBe('Relevant');
    expect( dropdown.children[1].textContent ).toBe('Newest');
    expect( dropdown.children[2].textContent ).toBe('Helpful');

    // first option is selected by default
    expect( dropdown.children[0].selected ).toBeTruthy();
    expect( dropdown.children[1].selected ).toBeFalsy()
    expect( dropdown.children[2].selected ).toBeFalsy();
    
    // there is always at least one geProductReviews call due to initial render
    waitFor(() => {
      let element = screen.queryAllByTestId('reviewsummary');
      expect( element[0].innerHTML ).toMatch(/I'm enjoying wearing these shades/);
      expect( element[1].innerHTML ).toMatch(/I am liking these glasses/);
      expect( serverRequests.getProductReviews.mock.calls[0][1] ).toBe('relevant');
      expect( serverRequests.getProductReviews.mock.calls.length ).toBe(1);
    }, {timeout: 5000, interval: 250})
    .then(() => {
      done();
    })
  });
  
  it('when "helpful" is selected, reviews are sorted from most to least helpful', (done) => {
    act(() => {
      render(<RatingsReviews />);
    })
    
    let dropdown = screen.queryByTestId('select');
    act(() => {
      // 'value' should be the *key* of the desired option
      fireEvent.change( dropdown, {target: {value: 'helpful'}} ); // 'Helpful'
    })    
    
    expect( dropdown.children[0].selected ).toBeFalsy();
    expect( dropdown.children[2].selected ).toBeTruthy();

    waitFor(() => {
      expect( serverRequests.getProductReviews.mock.calls[1][1] ).toBe('helpful');
      expect( serverRequests.getProductReviews.mock.calls.length ).toBe(2);
    }, {timeout: 3000, interval: 250})
    .then(() => {
      done();
    })
  });

  it('when "newest" is selected, most recent review appears first', (done) => {
    act(() => {
      render(<RatingsReviews />);
    })

    let dropdown = screen.queryByTestId('select');
    act(() => {
      // 'value' should be the *key* of the desired option
      fireEvent.change( dropdown, {target: {value: 'newest'}} ); // 'Newst'
    })    
    
    expect( dropdown.children[0].selected ).toBeFalsy();
    expect( dropdown.children[1].selected ).toBeTruthy();

    waitFor(() => {
      expect( serverRequests.getProductReviews.mock.calls[1][1] ).toBe('newest');
      expect( serverRequests.getProductReviews.mock.calls.length ).toBe(2);
    }, {timeout: 5000, interval: 250})
    .then(() => {
      done();
    });
  });
});