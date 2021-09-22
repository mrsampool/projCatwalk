
import React from 'react';
import { RatingsReviews } from '../RatingsReviews';
import { ReviewsList } from '../ReviewsList';
import {render, screen, fireEvent, act, waitFor, cleanup} from '@testing-library/react';
import { dummyReviewsData } from '../../../dummyData/dummyReviewsData';

// Need to mock react's useContext (JUST useContext) to supply dummyReviewsMetadata

jest.mock('react', () => {
  const { dummyReviewsMetadata } = jest.requireActual('../../../dummyData/dummyReviewsMetadata');
  
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

describe('The selected sort option depends on props.sort', () => {
  
  it('"Relevant" option/dropdown choice is selected when props.sort="relevant"', () => {
    render(<ReviewsList reviewsdata={dummyReviewsData} sort={'relevant'} setSort={() => {}}  filter={{}} setFilter={() => {}} />);

    // order of the dropdown options
    let dropdown = screen.queryByTestId('select');
    expect( dropdown.children[0].textContent ).toBe('Relevant');
    expect( dropdown.children[1].textContent ).toBe('Newest');
    expect( dropdown.children[2].textContent ).toBe('Helpful');

    // first option is selected by default
    expect( dropdown.children[0].selected ).toBeTruthy();
    expect( dropdown.children[1].selected ).toBeFalsy()
    expect( dropdown.children[2].selected ).toBeFalsy();
    
  });

  it('"Newest" option is selected when props.sort="newest"', () => {
    render(<ReviewsList reviewsdata={dummyReviewsData} sort={'newest'} setSort={() => {}}  filter={{}} setFilter={() => {}} />);

    // order of the dropdown options
    let dropdown = screen.queryByTestId('select');
    expect( dropdown.children[0].textContent ).toBe('Relevant');
    expect( dropdown.children[1].textContent ).toBe('Newest');
    expect( dropdown.children[2].textContent ).toBe('Helpful');

    // first option is selected by default
    expect( dropdown.children[0].selected ).toBeFalsy();
    expect( dropdown.children[1].selected ).toBeTruthy()
    expect( dropdown.children[2].selected ).toBeFalsy();
  });

  it('"Helpful" option is selected when props.sort="helpful"', () => {
    render(<ReviewsList reviewsdata={dummyReviewsData} sort={'helpful'} setSort={() => {}}  filter={{}} setFilter={() => {}} />);

    // order of the dropdown options
    let dropdown = screen.queryByTestId('select');
    expect( dropdown.children[0].textContent ).toBe('Relevant');
    expect( dropdown.children[1].textContent ).toBe('Newest');
    expect( dropdown.children[2].textContent ).toBe('Helpful');

    // first option is selected by default
    expect( dropdown.children[0].selected ).toBeFalsy();
    expect( dropdown.children[1].selected ).toBeFalsy()
    expect( dropdown.children[2].selected ).toBeTruthy();
  });


});


describe('props.setSort is called when using the sort options', () => {
  let mockSetSort = jest.fn();

  beforeEach(() => {
    render(<ReviewsList reviewsdata={dummyReviewsData} sort={'relevant'} setSort={mockSetSort}  filter={{}} setFilter={() => {}} />);
  });

  it('when "helpful" is selected in the dropdown, setSort is called with "helpful" as the parameter', () => {
    let dropdown = screen.queryByTestId('select');
    
    // 'value' should be the *key* of the desired option
    fireEvent.change( dropdown, {target: {value: 'helpful'}} ); 

    expect( mockSetSort.mock.calls[0][0] ).toBe('helpful');
  });

  it('when "newest" is selected in the dropdown, setSort is called with "newest" as the parameter', () => {
    let dropdown = screen.queryByTestId('select');
    act(() => {
      // 'value' should be the *key* of the desired option
      fireEvent.change( dropdown, {target: {value: 'newest'}} ); 
    })

    expect( mockSetSort.mock.calls[0][0] ).toBe('newest');
  });

  it('when "relevant" is selected in the dropdown, setSort is called with "relevant" as the parameter', () => {
    let dropdown = screen.queryByTestId('select');
    act(() => {
      // 'value' should be the *key* of the desired option
      fireEvent.change( dropdown, {target: {value: 'relevant'}} ); 
    })

    expect( mockSetSort.mock.calls[0][0] ).toBe('relevant');
  });
});