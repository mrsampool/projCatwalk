import React from 'react';

export const CarouselImg = props => {
  let {photos, index} = props;

  if ( index >= 0 && index < photos.length ){

    let imgData = photos[index];

    return (
      <span
        id={`thumb_${index}`}
        className={`carouselImg ${props.middle ? 'middle' : ''}`}
      >
        <img
          src={imgData.thumbnail_url}

        />
      </span>
    )
  } else {
    return(
      <div className='no-photo'/>
    )
  }
}