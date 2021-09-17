import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { ReviewForm } from './ReviewForm.jsx';
import { serverRequests } from '../../utils/serverRequests.js';
import { reviewsMeta } from '../../dummyData/reviewsMetadata'

jest.mock('../../utils/serverRequests.js');

/* 
Manual testing reveals that the browser does prevent me from submitting
the form; but these tests are able to bypass those restrictions
in the elements...
I'll need to do more manual checking before submission is allowed.

 */
describe('"Write Your Review" form fields', () => {
  beforeEach(() => {
    render( <ReviewForm characteristics={reviewsMeta.characteristics} /> );
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
  test.todo('mock postReview to inspect form submission')

  beforeEach(() => {
    render( <ReviewForm characteristics={reviewsMeta.characteristics} />);
  });
  
  it('should make an axios POST submission when submit button is clicked', () => {

    fireEvent.click( screen.queryByText(/Submit/) );
    expect( serverRequests.postReview.mock.calls.length ).toBe(1);
  })

  it('POST body should contain the form data', () => {

    let initialFormData = {
      rating: '3',
      recommend: null,
      characteristics: {
        14: '',
        15: '',
        16: '',
      },
      summary: '',
      body: '',
      photos: [],
      name: '',
      email: '',
    }

    fireEvent.click( screen.queryByText(/Submit/) );
    expect( serverRequests.postReview.mock.calls[0][0] ).toMatchObject( initialFormData );
  });

});