import React from 'react';
import axios from 'axios';

export const ReviewForm = () => {

  const radioGroup = (label, name) => {
    let group = [];
    group.push( (<label for={name} key={name}>{label}</label>) )
    for (let i = 0; i < 5; i++) {
      group.push( (<input type='radio' name={name} value={i} key={name + i}></input>) );
    }
    return group;
  };

  return (
    <div id='ReviewForm'>
      <h2>Write Your Review</h2>
      <h3>About the [Product Name]</h3>
      <label>Overall rating (mandatory)</label>
      <input type='range' min='0' max='5' ></input>
      <label>Do you recommend this product? (mandatory)</label>
      <input id='recommendyes' type='radio' name='recommend' value={true}></input><label for='recommendyes'>Yes</label>
      <input id='recommendno' type='radio' name='recommend' value={false}></input><label for='recommendno'>No</label>
      <label>Characteristics (mandatory)</label>
      <div> Some sort of grid?
        <span>Category</span><span>A size too small</span><span>half a size too small</span><span>Perfect</span><span>half a size too big</span><span>A size too wide</span>
        {radioGroup('Size', 'size')}
        <span></span><span>Too narrow</span><span>Slightly narrow</span><span>Perfect</span><span>Slightly wide</span><span>Too wide</span>
        {radioGroup('Width', 'width')}
        <span></span><span>Uncomfortable</span><span>Slightly uncomfortable</span><span>Ok</span><span>Comfortable</span><span>Perfect</span>
        {radioGroup('Comfort', 'comfort')}
        <span></span><span>Poor</span><span>Below average</span><span>What I expected</span><span>Pretty great</span><span>Perfect</span>
        {radioGroup('Quality', 'quality')}
        <span></span><span>Length</span><span>Runs slightly short</span><span>Perfect</span><span>Runs slightly long</span><span>Runs long</span>
        {radioGroup('Length', 'length')}
        <span></span><span>Runs tight</span><span>Runs slightly tight</span><span>Perfect</span><span>Runs slightly long</span><span>Runs long</span>
        {radioGroup('Fit', 'fit')}
      </div>
      <label>Review Summary</label>
      <input type='text' placeholder='Best purchase ever!' maxLength='60'></input>
      <label>Review Body (mandatory)</label>
      <input type='text' placeholder='Why did you like the product, or not?' maxLength='1000' minLength='50'></input>
      <label>Upload your photos:</label>
      <input type='file' id='photoupload' name='photoupload' accept='image/png, image/jpeg, image/jpg' ></input>
      <label>What is your nickname? (mandatory)</label>
      <input type='text' id='nickname' name='nickname' placeholder='jackson11!' maxLength='60'></input>
      <p>For privacy reasons, do not use your full name or email address</p>
      <label>Your email (mandatory)</label>
      <input type='text' id='nickname' name='nickname' placeholder='example: jackson11@email.com' maxLength='60'></input>
      <p>For authentication reasons, you will not be emailed</p>
      <button>Submit</button>
    </div>
  );
}
