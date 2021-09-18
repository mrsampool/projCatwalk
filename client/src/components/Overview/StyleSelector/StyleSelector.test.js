//Libraries
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

//Components
import { StyleSelector } from './StyleSelector.jsx';
import { Overview } from '../Overview.jsx';

//Dummy Data
import { singleProductStyles } from '../../../dummyData/productsList';
import { singleProduct as currentProduct } from '../../../dummyData/productsList';
import { ProductContext } from '../../../contexts/product-context';
let styles = singleProductStyles.results;



describe("Style Selector", ()=>{

  it('should display a thumbnail for each style', ()=>{

    render(
      <StyleSelector
        styles={styles}
        currentStyle={null}
        setCurrentStyle={()=>{}}
      />
    );

    styles.forEach( style => {
      let expectedThumbnail = style.photos[0].thumbnail_url;
      let actualThumbnail = screen.queryByTestId(expectedThumbnail);
      expect(actualThumbnail).toBeTruthy();
    })
  });

  it('should select the default style if no style selected', ()=>{

    function testDefaultStyleSetter(style){ currentStyle = style; }
    let currentStyle = null;

    render(
      <StyleSelector
        styles={styles}
        currentStyle={null}
        setCurrentStyle={testDefaultStyleSetter}
      />
    );

    expect(currentStyle['default?']).toBe(true);
  });

  it('should display the title for the current style', ()=>{

    let currentStyle = styles[0];

    render(
      <StyleSelector
        styles={styles}
        currentStyle={currentStyle}
        setCurrentStyle={()=>{}}
      />
    );

    let renderedTitle = screen.getByText( currentStyle.name );
    expect( renderedTitle ).toBeTruthy();
  });

  it('user should be able to change the selected style by clicking on the thumbnail', ()=>{

    let currentStyle = null;
    let newStyleId = styles[3].style_id;
    function testStyleSetter(style){ currentStyle = style; }

    render(
      <StyleSelector
        styles={styles}
        currentStyle={null}
        setCurrentStyle={testStyleSetter}
      />
    );

    let styleOption = screen.queryByTestId(`style-option-${newStyleId}`);
    fireEvent.click( styleOption );
    expect(currentStyle.style_id).toEqual(newStyleId);
  });

  it('should have a checkmark on the thumbnail for the selected style', ()=>{

    let currentStyle = styles[2];

    render(
      <StyleSelector
        styles={styles}
        currentStyle={currentStyle}
        setCurrentStyle={()=>{}}
      />
    );

    let styleOption = screen.queryByTestId(`style-option-${currentStyle.style_id}`);
    let children = Array.from(styleOption.children);
    let hasCheck = children.some( child => child.id === 'active-check' );
    expect( hasCheck ).toBe(true);

  });

  xit('clicking on the thumbnail of the selected style should have no effect', ()=>{

    let originalStyle = styles[1];
    console.log(originalStyle.style_id);
    let currentStyle = originalStyle;
    console.log(currentStyle.style_id);
    //let newStyleId = styles[2].style_id;

    function testStyleSetter(style){ currentStyle = style; }

    render(
      <StyleSelector
        styles={styles}
        currentStyle={currentStyle}
        setCurrentStyle={testStyleSetter}
      />
    );

    let styleOption = screen.queryByTestId(`style-option-${currentStyle.style_id}`);
    fireEvent.click( styleOption );
    expect(currentStyle.style_id).toEqual(originalStyle.style_id);
  });

  it('only one style can be selected at a time, a style must be selected at all times', ()=>{

    let styleId1 = styles[1].style_id;
    let styleId2 = styles[2].style_id;
    let styleId3 = styles[3].style_id;

    render(
      <ProductContext.Provider value={{currentProduct}}>
        <Overview />
      </ProductContext.Provider>
    );

    expect( screen.getByTestId('active-check') ).toBeTruthy();

    let styleOption1 = screen.queryByTestId(`style-option-${styleId1}`);
    fireEvent.click( styleOption1 );

    expect( screen.getByTestId('active-check') ).toBeTruthy();

    let styleOption2 = screen.queryByTestId(`style-option-${styleId2}`);
    fireEvent.click( styleOption2 );

    expect( screen.getByTestId('active-check') ).toBeTruthy();

    let styleOption3 = screen.queryByTestId(`style-option-${styleId3}`);
    fireEvent.click( styleOption3 );

    expect( screen.getByTestId('active-check') ).toBeTruthy();

  });

  test.todo('should display thumbnails in rows of 4');
  test.todo('the first thumbnail in the list should be the default');
  test.todo('every product should have at least one style');
});