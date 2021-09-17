// Libraries
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

// Components
import { ImgGallery } from './ImgGallery';

//Dummy Data
import { singleProductStyles, singleProduct } from '../../../dummyData/productsList';
import { Overview } from '../Overview';

describe('Img Gallery', ()=>{

  it('displays an image depending on the current style', ()=>{

    let currentStyle = singleProductStyles.results[0];

    render(
      <ImgGallery
        photos={currentStyle ? currentStyle.photos : null}
      />
    );

    let featPhoto = screen.getByTestId('featured-photo');

    expect( featPhoto.src ).toBe( currentStyle.photos[0].url );

  });
  test.todo('user should see an image gallery for each style');

  describe('Navigation Arrows', ()=>{
    test(`user can use left & right arrow buttons to cycle images through the primary frame`, ()=>{

      let currentStyle = singleProductStyles.results[0];

      render(
        <ImgGallery
          photos={currentStyle ? currentStyle.photos : null}
        />
      );

      let featPhoto = screen.getByTestId('featured-photo');
      const nextPhoto = screen.getByTestId('next-photo');

      expect( featPhoto.src ).toBe( currentStyle.photos[0].url );

      fireEvent.click( nextPhoto );

      expect( featPhoto.src ).toBe( currentStyle.photos[1].url );

      const prevPhoto = screen.queryByTestId('prev-photo');

      fireEvent.click( prevPhoto );

      expect( featPhoto.src ).toBe( currentStyle.photos[0].url );

    });
    test(`arrows should disappear if there are no more images in that direction`, ()=>{

      let currentStyle = singleProductStyles.results[0];

      render(
        <ImgGallery
          photos={currentStyle ? currentStyle.photos : null}
        />
      );

      let featPhoto = screen.getByTestId('featured-photo');
      let nextPhoto = screen.getByTestId('next-photo');
      let prevPhoto = screen.queryByTestId('prev-photo');

      expect( prevPhoto ).toBe( null );

      for (let i = 0; i < currentStyle.photos.length; i++){
        fireEvent.click( nextPhoto );
      }

      nextPhoto = screen.queryByTestId('next-photo');
      expect( nextPhoto ).toBe( null );

      prevPhoto = screen.getByTestId('prev-photo');
      expect( prevPhoto ).toBeTruthy();

      expect( featPhoto.src ).toBe( currentStyle.photos[ currentStyle.photos.length - 1 ].url );

    });
  })

  describe("Thumbnails", ()=>{
    test(`clicking on a thumbnail will jump the clicked image into the primary window`, ()=>{

      let currentStyle = singleProductStyles.results[0];

      render(
        <ImgGallery
          photos={currentStyle ? currentStyle.photos : null}
        />
      );

      let thumbnail = screen.queryByTestId('carouselImg3');
      let selected = thumbnail.src;

      fireEvent.click( thumbnail );

      let featPhoto = screen.getByTestId('featured-photo');

      let selectedFull = currentStyle.photos.find( photo =>{
        return photo['thumbnail_url'] === selected;
      })

      expect( featPhoto.src ).toBe( selectedFull.url );

    });
    test(`clicking on a thumbnail will center that thumbnail`, ()=>{

      let currentStyle = singleProductStyles.results[0];

      render(
        <ImgGallery
          photos={currentStyle ? currentStyle.photos : null}
        />
      );

      let bottomThumbnail = screen.queryByTestId('carouselImg5');
      let selected = bottomThumbnail.src;

      fireEvent.click( bottomThumbnail );

      let centerThumbnail = screen.queryByTestId('carouselImg3');
      expect( centerThumbnail.src ).toBe( selected );

    });
    test.todo('selected image will become primary image, shown in bigger size');
  });

  describe("Expanded View", ()=>{
    test(`clicking a full screen button will expand the image to span the full screen - there are still left and right arrows.`, ()=>{

      render(
        <Overview
          product={singleProduct}
          styles={singleProductStyles}
        />
      );

      fireEvent.click( screen.queryByTestId('fullscreen') );

      const gallery = screen.queryByTestId('img-gallery');

      expect( gallery.classList.contains( 'full' ) ).toBe( true );

      let nextPhoto = screen.queryByTestId('next-photo');
      expect( nextPhoto ).toBeTruthy();

      fireEvent.click( nextPhoto );

      let prevPhoto = screen.queryByTestId('prev-photo');
      expect( prevPhoto ).toBeTruthy();

    });
    test.todo(`in expanded view, clicking the image zooms in to 2.5x.`);
    test.todo(`Mouse effects the position of the primary image within the frame`);
    test.todo(`Mouse becomes a "zoom out" symbol when zoomed in`);
  });
})


