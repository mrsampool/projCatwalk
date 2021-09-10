import React from 'react';
import {render} from '@testing-library/react';

import {Overview} from './Overview.jsx';

describe("Overview", ()=>{

  const {container} = render( <Overview/> );
  let component = container.querySelector('#Overview');

  it("Renders without crashing", ()=>{

    expect(component).toBeTruthy();

  });

  [
    '#prod-category',
    '#prod-title',
    '#prod-description',
    '#prod-price',
    '#prod-description',
    '#select-style',
    '#select-size',
    '#add-cart',
  ].forEach( element => {
    it(`Contains a ${element.slice(5)} element`, ()=>{
      let element = component.querySelector(element);
      expect(element).toBeTruthy();
    })
  });

  describe("Product Price", ()=>{
    test.todo('should be dependent on the style currently selected');
    test.todo('should appear in red with a struckthrough original price if SKU is currently discounted');
  });

  describe("Style Selector", ()=>{
    test.todo('should select the default style if no further selection has been made');
    test.todo('should display a thumbnail for each style');
    test.todo('should display thumbnails in rows of 4');
    test.todo('should have a checkmark on the thumbnail for the selected style');
    test.todo('should display the title for the current style');
    test.todo('user should be able to change the selected style by clicking on the thumbnail');
    test.todo('clicking on the thumbnail of the selected style should have no effect');
    test.todo('the first thumbnail in the list should be the default');
    test.todo('every product should have at least one style');
    test.todo('only one style can be selected at a time, a style must be selected at all times');
  });

  describe("Size Selector", ()=>{
    test.todo('should be a dropdown list');
    test.todo('should list all of the available sizes for the current style');
    test.todo('should only list sizes in stock');
    test.todo('if no sizes in stock, dropdown should be inactive and read OUT OF STOCK');
    test.todo('When collapsed, should show selected size');
    test.todo('by default, show show "Select Size"');
  });

  describe("Quantity Selector", ()=>{
    test.todo('should be a dropdown list');
    test.todo('when a size has been selected, should default to 1');
    test.todo('options should be a sequence of ints ranging from 1 to the max');
    test.todo('max should be either the number of selected style and size in stock, limited to 15');
    test.todo('if no size selected - dropdown displays "-" and is disabled');
  });

  describe("Add To Cart", ()=>{
    test.todo('should be a button');
    test.todo('if "Select Size" is selected: clicking should open size dropdown - also gives message "Please select a size"');
    test.todo('if no stock, button should be hidden');
    test.todo('if valid size and qty are selected, clicking will add to cart');
  });

  describe("Star Rating", ()=>{
    test.todo('should always contain 5 stars');
    test.todo('stars should fill to nearest 1/4 to represent rating');
  });

  describe("Img Gallery - General", ()=>{
    test.todo('user should see an image gallery for each style');
    test.todo('gallery will change depending on the current style');
    test.todo(`user can use left & right arrow buttons to cycle images through the primary frame`);
    test.todo(`arrows should disappear if there are no more images in that direction`);
  });

  describe("Img Gallery - Thumbnails", ()=>{
    test.todo('selected image will become primary image, shown in bigger size');
    test.todo(`clicking on a thumbnail will jump the clicked image into the primary window, and carousel will center that thumbnail`);
  });

  describe("Img Gallery - Expanded View", ()=>{
    test.todo(`clicking a full screen button will expand the image to span the full screen - there are still left and right arrows.`);
    test.todo(`in expanded view, clicking the image zooms in to 2.5x.`);
    test.todo(`Mouse effects the position of the primary image within the frame`);
    test.todo(`Mouse becomes a "zoom out" symbol when zoomed in`);
  });

  describe("Social Media Buttons", ()=>{
    ['Facebook', 'Twitter', 'Pinterest'].forEach( socialNetwork =>{
      test.todo(`should contain a ${socialNetwork} sharing button`);
    });
  });

});