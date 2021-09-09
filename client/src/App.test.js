import React from 'react';
import {render} from '@testing-library/react';

import {App} from './App.jsx';

describe("App", ()=>{

  const {container} = render( <App/> );

  it("Renders without crashing", ()=>{

    let element = container.querySelector('#App');
    expect(element).toBeTruthy();

  });

});