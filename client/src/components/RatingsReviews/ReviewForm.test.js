import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

import { ReviewForm } from './ReviewForm';

describe('"Write a review" form', () => {
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