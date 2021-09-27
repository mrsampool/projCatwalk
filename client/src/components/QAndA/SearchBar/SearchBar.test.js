import React, { useContext } from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import {SearchBar} from "./SearchBar.js";
import {QandA} from "../QAndA";

describe("render Search Bar Component",()=>{
  /* beforeEach(()=>{
    act(()=>{
      render(<SearchBar/>);
    });
  }); */

  it('renders the SearchBar Component', () => {
    const {} = render(<SearchBar />);
    let element = document.querySelector('#SearchBar');
    expect(element).toBeTruthy();
  });

  it("render correctly", ()=>{
    const {queryByTestId, queryByPlaceholderText} = render(<SearchBar />);
    expect(queryByTestId('search-input')).toBeTruthy()

    expect(queryByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...')).toBeTruthy();
  })

  it('update on change', ()=>{
    const changeSearchTerm = jest.fn()
    const {queryByPlaceholderText} = render(<SearchBar changeSearchTerm={changeSearchTerm}/>)
    const searchInput = queryByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...');
    fireEvent.change(searchInput, {target: {value: 'test', changeSearchTerm: changeSearchTerm}});
  
    expect(changeSearchTerm).toHaveBeenCalledTimes(1)

    expect(searchInput.value).toBe('test');
  })



});