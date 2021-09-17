import React, {useState, useEffect} from 'react';

// Sub-Components
import { CarouselImg } from './CarouselImg.jsx';
import { ImgArrow } from './ImgArrow.jsx';

// Style Sheet
import './ImgCarousel.css';

export const ImgCarousel = props => {
  const {photos, index, setPhotoIndex} = props;

  const [offSet, setOffset] = useState(0);

  function handleImgChange(e) {
    let photoIndex = Number( e.target.id.split('_')[1] );
    setPhotoIndex(photoIndex);
  }

  function offSetUp(){
    setOffset( offSet + 1);
  }

  function offSetDown(){
    setOffset( offSet - 1);
  }

  useEffect( ()=>{ setOffset(0) }, [index]);

  return (
    <span id='ImgCarousel'>
      <ImgArrow
        type={'prev'}
        length={photos.length}
        index={index}
        offSet={offSet}
        change={offSetDown}
        className={`up`}
      />
      <CarouselImg
        index={index}
        offSet={offSet - 2}
        photos={photos}
        setPhotoIndex={setPhotoIndex}
      />

      <CarouselImg
        index={index}
        offSet={offSet - 1}
        photos={photos}
        setPhotoIndex={setPhotoIndex}
      />

      <CarouselImg
        index={index}
        offSet={offSet}
        photos={photos} middle={true}
        setPhotoIndex={setPhotoIndex}
      />

      <CarouselImg
        index={index}
        offSet={offSet + 1}
        photos={photos}
        setPhotoIndex={setPhotoIndex}
      />

      <CarouselImg
        index={index}
        offSet={offSet + 2}
        photos={photos}
        setPhotoIndex={setPhotoIndex}
      />

      <ImgArrow
        type={'next'}
        length={photos.length}
        index={index}
        offSet={offSet}
        change={offSetUp}
        className={`down`}
      />
    </span>
  )
}