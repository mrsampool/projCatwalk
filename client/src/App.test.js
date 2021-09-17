import React from 'react';
import {render, screen} from '@testing-library/react';

import {App} from './App.jsx';
import { RatingsReviews } from './components/RatingsReviews/RatingsReviews.jsx';

jest.mock('./components/RatingsReviews/RatingsReviews.jsx', () => {
  return {
    RatingsReviews: () => (<div data-testid='RatingsReviews'></div>),
  }
});


describe("App", ()=>{

  const {container} = render( <App/> );

  it("Renders without crashing", ()=>{

    let element = container.querySelector('#App');
    expect(element).toBeTruthy();

  });

  it(`Renders each major widget`, ()=>{
    render( <App/> );

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