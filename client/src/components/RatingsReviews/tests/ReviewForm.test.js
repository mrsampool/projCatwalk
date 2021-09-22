import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { ReviewForm } from '../ReviewForm.jsx';
import { serverRequests } from '../../../utils/serverRequests.js';
import { dummyReviewsMetadata } from '../../../dummyData/dummyReviewsMetadata'

jest.mock('../../../utils/serverRequests.js');

describe('"Write Your Review" form fields', () => {
  beforeEach(() => {
    render( <ReviewForm characteristics={dummyReviewsMetadata.characteristics} /> );
  });

  it('should display the 4 text input fields', () => {
    expect( screen.queryAllByRole('textbox') ).toHaveLength(4)
  });

  it('should display the 17 radio buttons (using dummy data)', () => {
    expect( screen.queryAllByRole('radio') ).toHaveLength(17);
  });

  it('should display the single slider input', () => {
    expect ( screen.queryAllByRole('slider')).toHaveLength(1);
  });
});

describe('Form submission', () => {
  beforeEach(() => {
    render( <ReviewForm characteristics={dummyReviewsMetadata.characteristics} />);
  });

  it('should not submit when submit button is clicked without form being filled out', () => {
    expect( screen.queryByText(/\[Checkmark\] Select an option/) ).toBeFalsy();
    expect( screen.queryByText(/\[X\] Select an option/) ).toBeTruthy();

    fireEvent.click( screen.queryByText(/Submit/) );
    expect( serverRequests.postReview.mock.calls.length ).toBe(0);
  });
  
  it('should be able to submit when form is filled and button is clicked', () => {
    expect( screen.queryByText(/\[Checkmark\] Select an option/) ).toBeFalsy();

    fireEvent.click( screen.queryByTestId(/recommendyes/) );
    fireEvent.click( screen.queryByTestId(/Size2/) );
    fireEvent.click( screen.queryByTestId(/Width4/) );
    fireEvent.click( screen.queryByTestId(/Comfort1/) );

    expect( screen.queryByText(/\[Checkmark\] Select an option/) ).toBeTruthy();

    let sampleText = 'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor'
    fireEvent.change( screen.queryByTestId(/fieldbody/), {target: {value: sampleText}} )

    expect( screen.queryByText(/\[Checkmark\] Review body must/) ).toBeTruthy();
    expect( screen.queryByText(/\[X\] Enter a nickname/) ).toBeTruthy();

    fireEvent.change( screen.queryByTestId(/fieldnickname/), {target: {value: 'mrloremipsum'}} )
    fireEvent.change( screen.queryByTestId(/fieldemail/), {target: {value: 'mrloremipsum@lorem.com'}} )

    expect( screen.queryByText(/\[Checkmark\] Enter a nickname/) ).toBeTruthy();

    fireEvent.click( screen.queryByText(/Submit/) );
    expect( serverRequests.postReview.mock.calls.length ).toBe(1);

    let formData = {
      rating: 3,
      recommend: true,
      characteristics: {
        14: 2,
        15: 4,
        16: 1,
      },
      summary: '',
      body: sampleText,
      photos: [],
      name: 'mrloremipsum',
      email: 'mrloremipsum@lorem.com',
    }

    expect( serverRequests.postReview.mock.calls[0][0] ).toMatchObject( formData );
  })

});