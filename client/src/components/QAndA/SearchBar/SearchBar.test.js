import React, { useContext } from 'react';
import {render} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import {SearchBar} from "./SearchBar.js"

describe("Search Bar Component",()=>{
  beforeEach(()=>{
    act(()=>{
      render(<SearchBar/>);
    });
  });

  it('renders the SearchBar Component', () => {
    let element = document.querySelector('#SearchBar');
    expect(element).toBeTruthy();
  });



});