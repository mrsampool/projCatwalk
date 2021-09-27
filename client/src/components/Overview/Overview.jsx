import React, {useState, useContext, useEffect} from 'react';

//Sub-Components
import { ImgGallery } from './ImgGallery/ImgGallery.jsx';
import { QtySelector } from './QtySelector/QtySelector.jsx';
import { SizeSelector } from './SizeSelector/SizeSelector.jsx';
import { StyleSelector } from './StyleSelector/StyleSelector.jsx';
import { Price } from './Price/Price.jsx';
import { AddToCart } from './AddToCart/AddToCart.jsx';
import { StarRating } from '../StarRating/StarRating.jsx';

// Contexts
import { ProductContext } from '../../contexts/ProductContext';
import {QueryContext} from "../../contexts/QueryContext";

//Placeholder Data
import {loadingPhotos, loadingStyles} from "../../dummyData/placeholderData";

//Style Sheet
import './Overview.css';
import { serverRequests } from '../../utils/serverRequests';
import {InBag} from "../InBag/InBag";
import {CartContext} from "../../contexts/CartContext";

export const Overview = (props) =>{

  let currentProduct;
  let productContext = useContext(ProductContext);
  if ( productContext ){
    currentProduct = productContext.currentProduct;
  }
  const params = useContext(QueryContext);

  const {cartAccess} = useContext(CartContext);

  const {id, category, name, slogan, description} = currentProduct || '';

  const [styles, setStyles] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [currentSku, setCurrentSku] = useState(null);
  const [currentQty, setCurrentQty] = useState(1);
  const [fullScreenImg, setFullScreenImg] = useState(false);

  function toggleFullScreenImg(){
    setFullScreenImg( !fullScreenImg );
  }

  function fetchStyles(){
    serverRequests.getProductStyles(id)
    .then( styles => setStyles(styles.results) );
  }

  useEffect( ()=>{
    if (id){
      fetchStyles();
    } else {
      //setStyles(props.styles || singleProductStyles.results)
    }
  }, [currentProduct])

  return(
    <div id='Overview' data-testid='Overview'>

      <div id='Overview-main'>

        <ImgGallery
          photos={currentStyle ? currentStyle.photos : loadingPhotos}
          toggleFull={toggleFullScreenImg}
          fullScreen={fullScreenImg}
          styleName={currentStyle ? currentStyle.name : ''}
        />

        <div id='overview-controls'>
          <StarRating/>
          <p id='prod-category' className={!category ? 'loading-category' : ''} >{category || 'Category'}</p>
          <p id='prod-title' className={!category ? 'loading-title' : ''}>{name || 'Title'}</p>
          <Price style={currentStyle} />

          <StyleSelector
            styles={styles || loadingStyles}
            currentStyle={currentStyle}
            setCurrentStyle={setCurrentStyle}
          />

          <div>
            <SizeSelector
              skus={currentStyle ? currentStyle.skus : null}
              setSize={setCurrentSize}
              setSku={setCurrentSku}
            />
            <QtySelector
              sku={currentSku}
              setQty={setCurrentQty}
            />
          </div>
          <AddToCart
            sku={currentSku}
            qty={currentQty}
            style={currentStyle}
          />
          <InBag
            sku={currentSku}
            prodId={id}
            cart={cartAccess ? cartAccess.items : null}
          />
        </div>

      </div>

      <div id='prod-copy'>
        <p id='prod-slogan'>{slogan}</p>
        <p id='prod-description'>{description}</p>
      </div>

    </div>
  )
}