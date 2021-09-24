import React, { useContext } from 'react';
import { StarRating } from '../StarRating/StarRating.jsx';
import { ProductContext } from '../../contexts/ProductContext.js';

import './styles/RatingsBreakdown.css'


export const RatingsBreakdown = (props) => {
  let { reviewsMetadata } = useContext(ProductContext);

  let clearFilterBtn = null;
  let wholePercentRecommended;
  let average = 0;
  let totalRatingsQty = 0;
  for (let rating in reviewsMetadata.ratings) {
    totalRatingsQty += parseInt( reviewsMetadata.ratings[rating] );
    average += (parseInt(rating) * parseInt( reviewsMetadata.ratings[rating]) );
  }

  average = average / totalRatingsQty;

  const addFilter = (e) => {
    let id = e.target.id;

    let key;
    switch (id) {
      case '5stars':
      key = '5';
      break;
      case '4stars':
        key = '4';
        break;
        case '3stars':
          key = '3';
        break;
        case '2stars':
        key = '2';
        break;
      case '1stars':
        key = '1'
        break;
      default:
        // if it's not any of these IDs, do nothing
        return;
      }

      // if the key already exists, delete it;
      // to get toggle functionality
      if (props.filter[key]) {
        let newFilter = {...props.filter};
        delete newFilter[key];
        props.setFilter(newFilter);
        return;
      }

      props.setFilter({...props.filter, [key]: true});
  };

  const clearFilters = () => {
    props.setFilter({})
  };

  if (Object.keys(props.filter).length > 0) {
    clearFilterBtn = (
      <button id='button-clear-filter' onClick={clearFilters} >Clear filters</button>
    );
  }

  const characteristicLegend = {
    Size: (<div className='characteristic-legend' ><span>A size too small</span><span>Perfect!</span><span>A size too wide</span></div>),
    Width: (<div className='characteristic-legend' ><span>Too narrow</span><span>Perfect!</span><span>Too wide</span></div>),
    Comfort: (<div className='characteristic-legend' ><span>Uncomfortable</span><span>Perfect!</span></div>),
    Quality: (<div className='characteristic-legend' ><span>Poor</span><span>Perfect!</span></div>),
    Length: (<div className='characteristic-legend' ><span>Runs short</span><span>Perfect!</span><span>Runs long</span></div>),
    Fit: (<div className='characteristic-legend' ><span>Runs tight</span><span>Perfect!</span><span>Runs tight</span></div>),
  }

  const characteristicsBreakdown = () => {
    let group = [];
    for (let name in reviewsMetadata.characteristics) {
      let row = (
        <div key={name + 'breakdown'} className='characteristic-unit'>
          <label htmlFor={name + 'meter'} className='characteristic-label' >{name}:</label> <input id={name + 'meter'} type='range' min='0' max='4' value={reviewsMetadata.characteristics[name].value} readOnly className='characteristic-bar' data-testid={name + 'meter'}></input>
          {characteristicLegend[name]}
        </div>
      );
      group.push(row);
    }
    return group;
  }

  wholePercentRecommended = Math.round( (parseInt(reviewsMetadata.recommended.true)) / totalRatingsQty * 100 )

  return (
    <div id='RatingBreakdown' onClick={addFilter} >
      <div style={{display: 'grid', gridTemplateColumns: '60px 1fr'}}>
        <h2>{average.toFixed(1)}</h2>
        <StarRating />
      </div>  
      <p>{wholePercentRecommended}% of reviews recommended this product</p>
      <br></br>
      <div style={{display: 'grid', gridTemplateColumns: '5rem 70%'}}>
        <label id='5stars' htmlFor='5starmeter' className='label-starmeter' >5 stars</label> <meter id='5starmeter' className='meter-starcount' min='0' max='1' value={reviewsMetadata.ratings['5'] ? reviewsMetadata.ratings['5'] / totalRatingsQty : 0} data-testid='starcountmeter'></meter>
        <label id='4stars' htmlFor='4starmeter' className='label-starmeter' >4 stars</label> <meter id='4starmeter' className='meter-starcount' min='0' max='1' value={reviewsMetadata.ratings['4'] ? reviewsMetadata.ratings['4'] / totalRatingsQty : 0} data-testid='starcountmeter'></meter>
        <label id='3stars' htmlFor='3starmeter' className='label-starmeter' >3 stars</label> <meter id='3starmeter' className='meter-starcount' min='0' max='1' value={reviewsMetadata.ratings['3'] ? reviewsMetadata.ratings['3'] / totalRatingsQty : 0} data-testid='starcountmeter'></meter>
        <label id='2stars' htmlFor='2starmeter' className='label-starmeter' >2 stars</label> <meter id='2starmeter' className='meter-starcount' min='0' max='1' value={reviewsMetadata.ratings['2'] ? reviewsMetadata.ratings['2'] / totalRatingsQty : 0} data-testid='starcountmeter'></meter>
        <label id='1stars' htmlFor='1starmeter' className='label-starmeter' >1 stars</label> <meter id='1starmeter' className='meter-starcount' min='0' max='1' value={reviewsMetadata.ratings['1'] ? reviewsMetadata.ratings['1'] / totalRatingsQty : 0} data-testid='starcountmeter'></meter>
      </div>
      <div style={{height: '20px'}}>
        {clearFilterBtn}
      </div>
      {characteristicsBreakdown()}
    </div>
  );
};
