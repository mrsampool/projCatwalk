//React
import React, {useState, useEffect, useContext} from 'react';

// Sub-Components
import { ImgCarousel } from './ImgCarousel.jsx';
import { ImgArrow } from './ImgArrow.jsx';

//Stylesheet
import './ImgGallery.css'

export const ImgGallery = (props) =>{

  const {photos} = props;

  const [curPhotoIndex, setCurPhotoIndex] = useState(0);
  const [ zoom, setZoom ] = useState(false);

  function prevPhoto(){
    setCurPhotoIndex( curPhotoIndex - 1 );
  }

  function nextPhoto(){
    setCurPhotoIndex( curPhotoIndex + 1 );
  }

  function zoomMouseMoveHandler(e){
    let img = document.querySelector('#featured-photo img');
    let gallery = document.getElementById('ImgGallery');
    let rect = gallery.getBoundingClientRect();
    let mouse = {x: e.clientX, y: e.clientY}

    function getTopOffset(){

      let percentPerPixel = 100 / rect.height;
      let percentDown = ( mouse.y - rect.top ) * percentPerPixel;

      let imgPixelsPerPercent = img.offsetHeight / 100;

      return ( 0 - (percentDown * 10) ) + 'px';
    }

    function getLeftOffset(){

      console.log(img.offsetWidth);

      let percentPerPixel = 100 / rect.width;
      let percentRight = ( mouse.x - rect.left ) * percentPerPixel;

      let difference = img.offsetWidth - rect.width;
      let diffPercent = difference / 100;

      let number = diffPercent * percentRight;

      return 0 - (number) + 'px';
    }

    img.style.top = getTopOffset();
    img.style.left = getLeftOffset();

  }

  function checkZoom(){

    let img = document.querySelector('#featured-photo img');
    let gallery = document.getElementById('ImgGallery');

    if (zoom){

      if (img && gallery){
        img.style.height = ( gallery.getBoundingClientRect().height * 2.5 ) + 'px';
        gallery.addEventListener('mousemove', zoomMouseMoveHandler);
      }

    } else {
      if (gallery){
        gallery.removeEventListener('mousemove', zoomMouseMoveHandler);
      }
      if (img){
        img.style.height = '';
        img.style.top = '';
      }
    }
  }

  useEffect( ()=>{
    setZoom(false);
  }, [photos, curPhotoIndex]);

  useEffect( ()=>{
    checkZoom();
  }, [zoom, photos]);

  if (photos){
    return(
      <div id='ImgGallery' className={`${props.fullScreen ? 'full' : ''}`}>

        <button
          id='fullscreen'
          onClick={props.toggleFull}
        >[ ]</button>

        <ImgCarousel
          photos={photos}
          index={curPhotoIndex}
          setPhotoIndex={setCurPhotoIndex}
        />

        <ImgArrow
          index={curPhotoIndex}
          change={prevPhoto}
          type={'prev'}
        />

        <div id='featured-photo'>
          <img
            src={photos[curPhotoIndex].url}
            className={zoom ? 'zoom' : 'nozoom'}
            onLoad={checkZoom}
            onClick={ ()=>{ setZoom(!zoom)} }
          />
        </div>

        <ImgArrow
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

