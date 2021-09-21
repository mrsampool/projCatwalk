import React from 'react';
import { ReviewsList } from '../ReviewsList';
import {render, screen, fireEvent} from '@testing-library/react';
import { dummyReviewsData } from '../../../dummyData/dummyReviewsData';

describe('Review component', () => {
  beforeEach(() => {
    render( <ReviewsList reviewsdata={dummyReviewsData} filter={{}} setFilter={() => {}}/> )
  });

  it('Test for star rating', () => {
    expect( screen.queryAllByTestId(/starmeter/)).toHaveLength(2);
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
    expect( screen.queryAllByText(/Helpfulness: \d/) ).toHaveLength(2);
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