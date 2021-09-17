//React
import React, {useState} from 'react';

//Stylesheet
import './SearchBar.css'

export const SearchBar = (props) =>{

  const {changeSearchTerm} = props;
  const [searchTerm, setSearchTerm] = useState("");


  return (
  <div id='SearchBar' className = "search container">
      <input
      type="text"
      name="QandASearch"
      placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
      onChange = {(e)=>{setSearchTerm(e.target.value);changeSearchTerm(e.target.value)}}
      />

  </div>
  )
};