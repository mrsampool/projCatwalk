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

jest.mock('../ReviewsList.jsx', () => {
  return {
    ReviewsList: jest.fn().mockReturnValue(<div data-testid='mockReviewsList'></div>),

  }
});

jest.mock('../RatingsBreakdown.jsx', () => {
  return {
    RatingsBreakdown: jest.fn().mockReturnValue(<div data-testid='mockRatingsBreakdown'></div>),

  }
});

describe('Ratings and Reviews rendering', () => {

  beforeEach(() => {
    act(() => {
      render(<RatingsReviews />);
    });
  });
  
  it('renders the RatingsReviews parent component', () => {
    expect( screen.queryByText(/Ratings and Reviews/) ).toBeTruthy();
  });

  it('renders a <ReviewsList /> component', () => {
    expect( screen.queryByTestId(/mockReviewsList/) ).toBeTruthy();
  });

  it('renders a <RatingsBreakdown /> component', () => {
    expect( screen.queryByTestId(/mockRatingsBreakdown/) ).toBeTruthy();
  });
  
  
});

describe('RatingsReviews data responsibilities', () => {
  beforeEach(() => {
    act(() => {
      render(<RatingsReviews />);
    });
  });
  it('should get reviewsMetadata and currentProduct data from useContext', () => {
    // useContext gets called twice... I'm not sure why, yet.
    expect( useContext.mock.calls.length ).toBe(2);
  });

  it('should make a call to getProductReviews() for full review data', () => {
    expect( getProductReviews.mock.calls.length ).toBe(1);
    expect( getProductReviews.mock.calls[0][0] ).toBe('2');
    expect( getProductReviews.mock.calls[0][1] ).toBe('relevant');
  });

  it('passes the <RatingsBreakdown /> component the needed data', () => {
    let propsObject = RatingsBreakdown.mock.calls[0][0]; 
    expect( propsObject.filter ).toStrictEqual({});
    expect( typeof propsObject.setFilter ).toBe('function');
  });

  it('passes the <ReviewsList /> component the needed data', () => {
    let propsObject = ReviewsList.mock.calls[0][0];
    expect( propsObject.reviewsdata.results[0].summary ).toMatch(/I'm enjoying wearing these shades/);
    expect( propsObject.filter ).toStrictEqual({});
    expect( typeof propsObject.setFilter ).toBe('function');
    expect( propsObject.sort ).toBe('relevant');
    expect( typeof propsObject.setSort ).toBe('function');
    
  });
});

