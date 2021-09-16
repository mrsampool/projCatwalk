import React from 'react';

// Sub-Components
import { CarouselImg } from './CarouselImg.jsx';

// Style Sheet
import './ImgCarousel.css';

export const ImgCarousel = props => {
  const {photos, index, setPhotoIndex} = props;

  function handleImgChange(e) {
    let photoIndex = Number( e.target.id.split('_')[1] );
    setPhotoIndex(photoIndex);
  }

  return (
    <span id='ImgCarousel'>
      <CarouselImg index={index - 2} photos={photos} />
      <CarouselImg index={index - 1} photos={photos} />
      <CarouselImg index={index} photos={photos} middle={true}/>
      <CarouselImg index={index + 1} photos={photos} />
      <CarouselImg index={index + 2} photos={photos} />
    </span>
  )
}