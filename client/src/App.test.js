import React from 'react';
import {render, screen} from '@testing-library/react';

import {App} from './App.jsx';

describe("App", ()=>{

  const {container} = render( <App/> );

  it("Renders without crashing", ()=>{

    let element = container.querySelector('#App');
    expect(element).toBeTruthy();

  });

  [
    'Overview',
    'QAndA',
    'RatingsReviews'
  ].forEach( widget =>{
    it(`Renders a ${widget} widget`, ()=>{
      render( <App/> );
      let renderedWidget = screen.queryByTestId(widget);
      expect( renderedWidget ).toBeTruthy();
    });
  });

});