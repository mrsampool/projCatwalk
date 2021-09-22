import React from 'react';
import {render, screen} from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {ProductDetail} from './ProductDetail.jsx';
import { RatingsReviews } from '../../components/RatingsReviews/RatingsReviews.jsx';

jest.mock('../../components/RatingsReviews/RatingsReviews.jsx', () => {
  return {
    RatingsReviews: () => (<div data-testid='RatingsReviews'></div>),
  }
});


describe("App", ()=>{

  const {container} = render(
    <Router>
      <ProductDetail/>
    </Router>
  );

  it("Renders without crashing", ()=>{

    let element = container.querySelector('#App');
    expect(element).toBeTruthy();

  });

  it(`Renders each major widget`, ()=>{
    render(
      <Router>
        <ProductDetail/>
      </Router>
    );

    [
      'Overview',
      'QAndA',
      'RatingsReviews',
    ].forEach( widget =>{
      let renderedWidget = screen.queryByTestId(widget);
      expect( renderedWidget ).toBeTruthy();
    });
  });

});