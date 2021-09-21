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
import { ProductContext, QueryContext } from '../../contexts/product-context';

//Style Sheet
import './Overview.css';
import { serverRequests } from '../../utils/serverRequests';
import { singleProductStyles } from '../../dummyData/productsList';

export const Overview = (props) =>{

  let currentProduct;
  let productContext = useContext(ProductContext);
  if ( productContext ){
    currentProduct = productContext.currentProduct;
  }
  //const {currentProduct} = useContext(ProductContext);
  const params = useContext(QueryContext);

  const {id, category, name, slogan, description} = currentProduct || '';

  const [styles, setStyles] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [currentSku, setCurrentSku] = useState(null);
  const [currentQty, setCurrentQty] = useState(null);
  const [fullScreenImg, setFullScreenImg] = useState(false);

  function toggleFullScreenImg(){
    setFullScreenImg( !fullScreenImg );
  }

  function fetchStyles(){
    serverRequests.getProductStyles(id)
    .then( styles => setStyles(styles.results) );
  }

  useEffect( ()=>{
    if (params && params.noDummy && id){
      console.log('fetched');
      fetchStyles();
    } else {
      //setStyles(props.styles || singleProductStyles.results)
    }
  }, [currentProduct])

  return(
    <div id='Overview' data-testid='Overview'>

      <div id='Overview-main'>

        <ImgGallery
          photos={currentStyle ? currentStyle.photos : null}
          toggleFull={toggleFullScreenImg}
          fullScreen={fullScreenImg}
        />

        <div id='overview-controls'>
          {/* <StarRating/> */}
          <p id='prod-category'>{category}</p>
          <p id='prod-title'>{name}</p>
          <Price style={currentStyle} />
          {
            styles ?
            <StyleSelector
              styles={styles}
              currentStyle={currentStyle}
              setCurrentStyle={setCurrentStyle}
            />
            : null
          }
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