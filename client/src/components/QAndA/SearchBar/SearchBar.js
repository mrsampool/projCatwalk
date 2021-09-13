//React
import React, {useState} from 'react';

//Stylesheet
import './SearchBar.css'

export const SearchBar = (props) =>{
  const [keyword, setKeyword] = useState('');
  const SubmitHandler = (event) =>{
    event.preventDefault();
    console.log('tests for search submit button')
  }
  return (
  <div id='SearchBar' className = "search container">
    <form onSubmit = {SubmitHandler}>
      <input
      type="text"
      name="QandASearch"
      placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
      onChange = {(e)=>setKeyword(e.target.value)}
      ></input>
      <button type="submit">Search</button>
    </form>
  </div>
  )
};