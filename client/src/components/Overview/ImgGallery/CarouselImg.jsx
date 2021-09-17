import React from 'react';

export const CarouselImg = props => {
  let {photos, index, offSet, setPhotoIndex} = props;

  let imgData = photos[index + offSet];

  function handleClick(){
    setPhotoIndex(index + offSet);
  }

  if ( imgData ){

    let active = !offSet;

    return (
      <span
        id={`thumb_${index}`}
        className={`carouselImg ${active ? 'active' : ''}`}
      >
        <img
          src={imgData.thumbnail_url}
          onClick={handleClick}
          data-testid={`carouselImg${props.testId}`}
        />
      </span>
    )
  } else {
    return(
      <div className='no-photo'/>
    )
  }
}