import React, {useState} from 'react';

//Sub-Components
import { ImgGallery } from './ImgGallery/ImgGallery.jsx';
import { QtySelector } from './QtySelector/QtySelector.jsx';
import { SizeSelector } from './SizeSelector/SizeSelector.jsx';
import { StyleSelector } from './StyleSelector/StyleSelector.jsx';
import { StarRating } from '../StarRating/StarRating.jsx';

export const Overview = (props) =>{

  const {category, name, slogan, description} = props.product;
  const styles = props.styles.results;

  const [currentStyle, setCurrentStyle] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [currentQty, setCurrentQty] = useState(null);

  return(
    <div id='Overview' data-testid='Overview'>

      <div>

        <span>
          <ImgGallery/>
        </span>

        <span>
          <StarRating/>
          <p id='prod-category'>{category}</p>
          <p id='prod-title'>{name}</p>
          <StyleSelector
            styles={styles}
            currentStyle={currentStyle}
            setCurrentStyle={setCurrentStyle}
          />
          <div>
            <SizeSelector
              skus={currentStyle ? currentStyle.skus : null}
              setSize={setCurrentSize}
            />
            <QtySelector
              size={currentSize}
              skus={currentStyle ? currentStyle.skus : null}
              setQty={setCurrentQty}
            />
          </div>
          <button id='add-cart'>ADD TO BAG</button>
        </span>

      </div>

      <div id='prod-description'>
        <p id='prod-slogan'>{slogan}</p>
        <p id='prod-slogan'>{description}</p>
      </div>

    </div>
  )
}