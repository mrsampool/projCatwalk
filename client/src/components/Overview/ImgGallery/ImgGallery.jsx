//React
import React, {useState, useEffect} from 'react';

//Stylesheet
import './ImgGallery.css'

export const ImgGallery = (props) =>{

  const {photos} = props;
  const [curPhotoIndex, setCurPhotoIndex] = useState(0);

  function prevPhoto(){
    setCurPhotoIndex( curPhotoIndex - 1 );
  }

  function nextPhoto(){
    setCurPhotoIndex( curPhotoIndex + 1 );
  }

  if (photos){
    return(
      <div id='ImgGallery'>

        <ImgCarousel
          photos={photos}
          index={curPhotoIndex}
          setPhotoIndex={setCurPhotoIndex}
        />

        <PhotoArrow
          index={curPhotoIndex}
          change={prevPhoto}
          type={'prev'}
        />

        <img id='featured-photo' src={photos[curPhotoIndex].url}/>

        <PhotoArrow
          index={curPhotoIndex}
          change={nextPhoto}
          type={'next'}
          length={photos.length}
        />

      </div>
    )
  } else {
    return null;
  }

};

const PhotoArrow = props => {

  const {type, index, change, length} = props;

  if (
    ( type === 'prev' && index > 0 )
    ||
    ( type === 'next' && index < length - 1 )
    ) {
      return <button onClick={change}>{type}</button>
    }
  return null;
}

const ImgCarousel = props => {
  const {photos, index, setPhotoIndex} = props;

  function handleImgChange(e) {
    let photoIndex = Number( e.target.id.split('_')[1] );
    setPhotoIndex(photoIndex);
  }

  return (
    <span id='ImgCarousel'>
      <CarouselImg index={index - 2} photos={photos} />
      <CarouselImg index={index - 1} photos={photos} />
      <CarouselImg index={index} photos={photos} />
      <CarouselImg index={index + 1} photos={photos} />
      <CarouselImg index={index + 2} photos={photos} />
    </span>
  )
}

const CarouselImg = props => {
  let {photos, index} = props;

  if ( index >= 0 && index < photos.length ){

    let imgData = photos[index];

    return (
      <span id={`thumb_${index}`} className='carouselImg'>
        <img
          src={imgData.thumbnail_url}
        />
      </span>
    )
  } else { return null }
}