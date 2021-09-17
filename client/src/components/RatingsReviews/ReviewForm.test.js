import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import { ReviewForm } from './ReviewForm.jsx';
import { serverRequests } from '../../utils/serverRequests.js';

jest.mock('../../utils/serverRequests.js');

describe('"Write Your Review" form fields', () => {
  beforeEach(() => {
    render( <ReviewForm /> );
  });

  it('should display the 4 text input fields', () => {
    expect( screen.queryAllByRole('textbox') ).toHaveLength(4)
  });

  it('should display the 32 radio buttons', () => {
    expect( screen.queryAllByRole('radio') ).toHaveLength(32);
  });

  it('should display the single slider input', () => {
    expect ( screen.queryAllByRole('slider')).toHaveLength(1);
  });
});

describe('Form submission', () => {
  test.todo('mock postReview to inspect form submission')

  beforeEach(() => {
    render( <ReviewForm />);
  });
  
  it('should make an axios POST submission when submit button is clicked', () => {

    fireEvent.click( screen.queryByText(/Submit/) );
    expect( serverRequests.postReview.mock.calls.length ).toBe(1);
  })

  it('POST body should contain the form data', () => {

    let initialFormData = {
      overallrating: '3',
      recommend: null,
      size: '',
      width: '',
      comfort: '',
      quality: '',
      length: '',
      fit: '',
      summary: '',
      body: '',
      photoupload: null,
      nickname: '',
      email: '',
    }

    fireEvent.click( screen.queryByText(/Submit/) );

    expect( serverRequests.postReview.mock.calls[0][1] ).toHaveProperty('size', '');

  });

});