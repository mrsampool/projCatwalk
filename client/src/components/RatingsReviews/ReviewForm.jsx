import React from 'react';
import axios from 'axios';

export const ReviewForm = () => {

  return (
    <div id='ReviewForm'>
      <h2>Write Your Review</h2>
      <h3>About the [Product Name]</h3>
      <label>Overall rating (mandatory)</label>
      <input type='range' min='0' max='5'></input>
      <label>Do you recommend this product? (mandatory)</label>
      <input id='recommendyes' type='radio' name='recommend' value={true}></input><label for='recommendyes'>Yes</label>
      <input id='recommendno' type='radio' name='recommend' value={false}></input><label for='recommendno'>No</label>
      <label>Characteristics (mandatory)</label>
      <label for='size'>Size</label><input type='radio' name=''></input>
      <label for='width'>Width</label><input type='radio' name=''></input>
      <label for='comfort'>Comfort</label><input type='radio' name=''></input>
      <label for='quality'>Quality</label><input type='radio' name=''></input>
      <label for='length'>Length</label><input type='radio' name=''></input>
      <label for='fit'>Fit</label><input type='radio' name=''></input>
      <label>Review Summary</label>
      <label>Review Body (mandatory)</label>
      <label>Upload your photos:</label>
      <label>What is your nickname? (mandatory)</label>
      <label>Your email (mandatory)</label>
      <button>Submit</button>
    </div>
  );
}
