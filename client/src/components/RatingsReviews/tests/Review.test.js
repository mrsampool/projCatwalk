import React from 'react';
import { Review } from '../Review.jsx';
import {render, screen, fireEvent} from '@testing-library/react';
import { dummyReviewsData } from '../../../dummyData/dummyReviewsData';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useContext: () => {
      return ({setModalComponent: () => {}})
    },
}});

jest.mock('../../StarRating/StarRating.jsx', () => {
  return {
    StarRating: () => <div data-testid='mockStarRating'></div>,
  }
})

describe('Review: basic rendering of given review data', () => {
  beforeEach(() => {
    render( <Review review={dummyReviewsData.results[0]}/> )
  });

  it('Test for star rating', () => {
    expect( screen.queryByTestId(/mockStarRating/) ).toBeTruthy();
    expect( screen.queryAllByTestId(/mockStarRating/)).toHaveLength(1);
  });

  it('Test for summary', () => {
    expect( screen.queryByText(/I'm enjoying wearing these shades/) ).toBeTruthy();
  });

  it('Test for date', () => {
    screen.debug();
    // This date can change due to locale, so we can't
    // necessarily just query for the exact date.
    expect( screen.queryByTestId(/reviewdate/).innerHTML ).toBeTruthy();
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
    expect( screen.queryByText(/I recommend this product/) ).toBeFalsy();
  });

  it('Test for response', () => {
    expect( screen.queryByText(/Some sort of response/) ).toBeTruthy();
  });

  it('Test for helpfulness', () => {
    expect( screen.queryByText(/(5)/) ).toBeTruthy();
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