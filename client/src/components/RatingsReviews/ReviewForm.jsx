import React from 'react';
import axios from 'axios';

import './ReviewForm.css';

export class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.radioGroup = this.radioGroup.bind(this);
    this.formChangeHandler = this.formChangeHandler.bind(this);

    this.state = {
      overallrating: '3',
      recommend: null,
      size: '2',
      width: '2',
      comfort: '2',
      quality: '2',
      length: '2',
      fit: '2',
      summary: '',
      body: '',
      photoupload: null,
      nickname: '',
      email: '',
    }
  }

  formSubmitHandler(e) {
    console.log('I would POST: ')
    console.log(this.state)
  }
  
  formChangeHandler(e) {
    this.setState( {[e.target.name]: e.target.value} )
  }



  radioGroup(label, name) {
    let group = [];
    group.push( (<label htmlFor={name} key={name} >{label}</label>) );
    for (let i = 0; i < 5; i++) {
      group.push( (<input type='radio' name={name} value={i.toString()} key={name + i} checked={this.state[name] === i.toString()} onChange={this.formChangeHandler}></input>) );
    }
    return group;
  };

  render() {
    return (
      <div id='ReviewForm'>
        <h2>Write Your Review</h2>
        <h3>About the -Product Name-</h3>

        <label>Overall rating (mandatory)</label><br></br>
        <input name='overallrating' type='range' min='0' max='5' className='form-rating-range' value={this.state.overallrating} onChange={this.formChangeHandler} ></input><br></br>

        <label>Do you recommend this product? (mandatory)</label>
        <div id='recommendradio'>
          <label htmlFor='recommendyes'>Yes</label><input id='recommendyes' type='radio' name='recommend' value={true} onChange={this.formChangeHandler}></input>
          <label htmlFor='recommendno'>No</label><input id='recommendno' type='radio' name='recommend' value={false} onChange={this.formChangeHandler}></input>
        </div>

        <label>Characteristics (mandatory)</label>
        <div id='characteristics'> 
          <span>Category</span><span>A size too small</span><span>half a size too small</span><span>Perfect</span><span>half a size too big</span><span>A size too wide</span>
          {this.radioGroup('Size', 'size')}
          <span></span><span>Too narrow</span><span>Slightly narrow</span><span>Perfect</span><span>Slightly wide</span><span>Too wide</span>
          {this.radioGroup('Width', 'width')}
          <span></span><span>Uncomfortable</span><span>Slightly uncomfortable</span><span>Ok</span><span>Comfortable</span><span>Perfect</span>
          {this.radioGroup('Comfort', 'comfort')}
          <span></span><span>Poor</span><span>Below average</span><span>What I expected</span><span>Pretty great</span><span>Perfect</span>
          {this.radioGroup('Quality', 'quality')}
          <span></span><span>Length</span><span>Runs slightly short</span><span>Perfect</span><span>Runs slightly long</span><span>Runs long</span>
          {this.radioGroup('Length', 'length')}
          <span></span><span>Runs tight</span><span>Runs slightly tight</span><span>Perfect</span><span>Runs slightly long</span><span>Runs long</span>
          {this.radioGroup('Fit', 'fit')}
        </div>

        <label>Review Summary</label><br></br>
        <input name='summary' type='text' placeholder='Best purchase ever!' maxLength='60' className='form-input-text-med' onChange={this.formChangeHandler} ></input><br></br>

        <label>Review Body (mandatory)</label><br></br>
        <textarea name='body' placeholder='Why did you like the product, or not?' maxLength='1000' minLength='50' className='form-input-text-lg' onChange={this.formChangeHandler} ></textarea><br></br>

        <label>Upload your photos:</label><br></br>
        <input name='photoupload' type='file' id='photoupload' accept='image/png, image/jpeg, image/jpg' style={{width: '25%'}} onChange={this.formChangeHandler} ></input><br></br>

        <label>What is your nickname? (mandatory)</label><br></br>
        <input name='nickname' type='text' id='nickname'  placeholder='jackson11!' maxLength='60' className='form-input-text-sm' onChange={this.formChangeHandler} ></input><br></br>
        <p>For privacy reasons, do not use your full name or email address</p>

        <label>Your email (mandatory)</label><br></br>
        <input name='email' type='text' id='email' placeholder='example: jackson11@email.com' maxLength='60' className='form-input-text-sm' onChange={this.formChangeHandler} ></input><br></br>
        <p>For authentication reasons, you will not be emailed</p>

        <button onClick={this.formSubmitHandler} >Submit</button>
      </div>
    );
  } // end render()
} // end ReviewForm class
