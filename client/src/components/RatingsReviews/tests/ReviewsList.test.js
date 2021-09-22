
import React from 'react';
import { RatingsReviews } from '../RatingsReviews';
import { ReviewsList } from '../ReviewsList';
import {render, screen, fireEvent} from '@testing-library/react';
import { dummyReviewsData } from '../../../dummyData/dummyReviewsData';

// Need to mock react's useContext (JUST useContext) to supply dummyReviewsMetadata

jest.mock('react', () => {
  const { dummyReviewsMetadata } = jest.requireActual('../../dummyData/dummyReviewsMetadata');
  
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn().mockReturnValue({reviewsMetadata: dummyReviewsMetadata}),
  };
});

describe('ReviewsList component', () => {
  beforeEach(() => {
    render( <ReviewsList reviewsdata={dummyReviewsData} filter={{}} setFilter={() => {}} /> )
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

describe('Sorting of Reviews (API calls include "sort" parameter and correct value', () => {
  beforeEach(() => {
    act(() => {
      render(<ReviewsList />);
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