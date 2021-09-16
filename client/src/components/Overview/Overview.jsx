import React, {useState} from 'react';

//Sub-Components
import { ImgGallery } from './ImgGallery/ImgGallery.jsx';
import { QtySelector } from './QtySelector/QtySelector.jsx';
import { SizeSelector } from './SizeSelector/SizeSelector.jsx';
import { StyleSelector } from './StyleSelector/StyleSelector.jsx';
import { Price } from './Price/Price.jsx';
import { AddToCart } from './AddToCart/AddToCart.jsx';
import { StarRating } from '../StarRating/StarRating.jsx';

//Style Sheet
import './Overview.css';

export const Overview = (props) =>{

  const {category, name, slogan, description} = props.product;
  const styles = props.styles.results;

  const [currentStyle, setCurrentStyle] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [currentSku, setCurrentSku] = useState(null);
  const [currentQty, setCurrentQty] = useState(null);

  return(
    <div id='Overview' data-testid='Overview'>

      <div id='Overview-main'>

        <ImgGallery
          photos={currentStyle ? currentStyle.photos : null}
        />

        <div id='overview-controls'>
          <StarRating/>
          <p id='prod-category'>{category}</p>
          <p id='prod-title'>{name}</p>
          <Price style={currentStyle} />
          <StyleSelector
            styles={styles}
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