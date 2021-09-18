import React from 'react';
import { serverRequests } from '../../utils/serverRequests.js';
let { postReview } = serverRequests;

import './ReviewForm.css';

export class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.radioGroup = this.radioGroup.bind(this);
    this.formChangeHandler = this.formChangeHandler.bind(this);

    this.state = {
      rating: '3',
      recommend: null,
      Size: '',
      Width: '',
      Comfort: '',
      Quality: '',
      Length: '',
      Fit: '',
      summary: '',
      body: '',
      photos: [],
      nickname: '',
      email: '',
      checkRecommend: false,
      checkBodyLength: false,
      checkNickname: false,
      checkEmail: false,
    }

    this._characteristicHeaders = {
      Size: (<><span></span><span>A size too small</span><span>half a size too small</span><span>Perfect</span><span>half a size too big</span><span>A size too wide</span></>),
      Width: (<><span></span><span>Too narrow</span><span>Slightly narrow</span><span>Perfect</span><span>Slightly wide</span><span>Too wide</span></>),
      Comfort: (<><span></span><span>Uncomfortable</span><span>Slightly uncomfortable</span><span>Ok</span><span>Comfortable</span><span>Perfect</span></>),
      Quality: (<><span></span><span>Poor</span><span>Below average</span><span>What I expected</span><span>Pretty great</span><span>Perfect</span></>),
      Length: (<><span></span><span>Length</span><span>Runs slightly short</span><span>Perfect</span><span>Runs slightly long</span><span>Runs long</span></>),
      Fit: (<><span></span><span>Runs tight</span><span>Runs slightly tight</span><span>Perfect</span><span>Runs slightly long</span><span>Runs long</span></>),
    }

    this.emailRegex = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  }

  formSubmitHandler(e) {
    /* 
    API Body parameters
    product_id: integer
    rating: int
    summary: text
    body: text
    recommend: bool
    name: text
    email: text
    photos: [text] array of text urls that link to images to be shown
    characteristics: {
      Size id: int (value of rating)
      Width id: int
      Comfort id: int
      Quality id: int
      Length id: int
      Fit id: int
    }

      */
    e.preventDefault();
    
    /*
    images must be valid and able to be uploaded (but the image uploads)
    */
    if(this.state.checkRecommend 
      && this.state.checkBodyLength
      && this.state.checkNickname
      && this.state.checkEmail) 
    {
      let characteristics = {}
      for (let chrctrstc in this.props.characteristics) {
        characteristics[this.props.characteristics[chrctrstc].id] = this.state[chrctrstc];
      }
  
      let formData = {
        rating: this.state.rating,
        summary: this.state.summary,
        body: this.state.body,
        recommend: this.state.recommend,
        name: this.state.nickname,
        email: this.state.email,
        photos: this.state.photos,
        characteristics,
      }

      postReview(formData)
      .then((response) => {
        //disable submit button?
      })
      .catch(err => console.log('There was an error with form submission: ', err));
    }

  }

  formFieldCheck() {
    if(this.state.recommend === null ) {
      this.setState({checkRecommend: false});
    } else this.setState({checkRecommend: true})

    if(this.state.body.length >= 50) {
      this.setState({checkBodyLength: true});
    } else this.setState({checkBodyLength: false});

    if(this.state.nickname !== '') {
      this.setState({checkNickname: true})
    } else this.setState({checkNickname: false})

    if(this.emailRegex.exec(this.state.email) !== null) {
      this.setState({checkEmail: true})
    } else this.setState({checkEmail: false})
  }
  
  formChangeHandler(e) {
    this.setState( {[e.target.name]: e.target.value}, () => {
      this.formFieldCheck();
    });

  }

  radioGroup() {
    let row = [];
    for (let characteristic in this.props.characteristics)
    {
      let name = characteristic;
      row.push( this._characteristicHeaders[name] );
      row.push( (<label htmlFor={name} key={name} >{name}</label>) );
      for (let i = 0; i < 5; i++) {
        row.push( (<input required type='radio' name={name} value={i.toString()} key={name + i} checked={this.state[name] === i.toString()} onChange={this.formChangeHandler} data-testid={name + i} ></input>) );
      }
    }
    return row;
  };

  render() {
    return (
      <div id='ReviewForm'>
        <form onSubmit={this.formSubmitHandler}>
          <h2>Write Your Review</h2>
          <h3>About the -Product Name-</h3>

          <label>Overall rating (mandatory)</label><br></br>
          <input required name='rating' type='range' min='0' max='5' className='form-rating-range' value={this.state.rating} onChange={this.formChangeHandler} ></input><br></br>

          <label>Do you recommend this product? (mandatory)</label>
          <div id='recommendradio'>
            <label htmlFor='recommendyes'>Yes</label><input id='recommendyes' type='radio' name='recommend' value={true} onChange={this.formChangeHandler} data-testid='recommendyes' ></input>
            <label htmlFor='recommendno'>No</label><input id='recommendno' type='radio' name='recommend' value={false} onChange={this.formChangeHandler} data-testid='recommendno' ></input>
          </div>

          <label>Please choose a rating for each of this product's characteristics (mandatory):</label>
          <div id='characteristics'> 
            {this.radioGroup()}
          </div>

          <label>Review Summary</label><br></br>
          <input name='summary' type='text' value={this.state.summary} placeholder='Best purchase ever!' maxLength='60' className='form-input-text-med' onChange={this.formChangeHandler} ></input><br></br>

          <label>Review Body (mandatory)</label><br></br>
          <textarea required name='body' value={this.state.body} placeholder='Why did you like the product, or not?' maxLength='1000' minLength='50' className='form-input-text-lg' onChange={this.formChangeHandler} data-testid='fieldbody'></textarea><br></br>

          <label>Upload your photos:</label><br></br>
          <input name='photos' type='file' id='photos' accept='image/png, image/jpeg, image/jpg' style={{width: '25%'}} onChange={this.formChangeHandler} ></input><br></br>

          <label>What is your nickname? (mandatory)</label><br></br>
          <input required name='nickname' type='text' value={this.state.nickname} id='nickname'  placeholder='jackson11!' maxLength='60' className='form-input-text-sm' onChange={this.formChangeHandler} data-testid='fieldnickname'></input><br></br>
          <p>For privacy reasons, do not use your full name or email address</p>

          <label>Your email (mandatory)</label><br></br>
          <input required name='email' type='text' value={this.state.email} id='email' placeholder='example: jackson11@email.com' maxLength='60' className='form-input-text-sm' onChange={this.formChangeHandler} data-testid='fieldemail'></input><br></br>
          <p>For authentication reasons, you will not be emailed</p>

          <button type='submit' >Submit</button>
          <p>{this.state.checkRecommend ? '[Checkmark]' : '[X]'} Select an option for whether or not you recommend this product</p>
          <p>{this.state.checkBodyLength ? '[Checkmark]' : '[X]'} Review body must be over 50 characters'</p>
          <p>{this.state.checkNickname ? '[Checkmark]' : '[X]'} Enter a nickname</p>
          <p>{this.state.checkEmail ? '[Checkmark]' : '[X]' } Enter a valid email address</p>
        </form>
      </div>
    );
  } // end render()
} // end ReviewForm class
