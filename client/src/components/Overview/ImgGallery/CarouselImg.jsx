import React, {useEffect} from 'react';

export const CarouselImg = props => {
  let {photos, index, offSet, setPhotoIndex} = props;

  let imgData = photos[index + offSet];

  function handleClick(){
    setPhotoIndex(index + offSet);
  }

  function imgLoad(){
    const img = document.querySelector(`#thumb_${index} img`);
    img.style.opacity = '1';
  }

  useEffect( ()=>{
    let img = document.querySelector(`#thumb_${index} img`);
    if (img){ img.style.opacity = '0.5'; }
  }, [photos,index])

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
          onLoad={ imgLoad }
          className='carouselImg'
        />
      </span>
    )
  } else {
    return(
      <div className='no-photo'/>
    )
  }
}