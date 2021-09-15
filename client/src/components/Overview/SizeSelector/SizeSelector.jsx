//React
import React from 'react';

//Stylesheet
import './SizeSelector.css'

export const SizeSelector = (props) =>{

  let { skus, setSize, setSku } = props;

  function handleChange(e){

    let sku = Object.keys(skus).find( sku =>{
      let currentSku = skus[sku];
      return currentSku.size === e.target.value;
    })

    setSize(e.target.value);
    setSku( [ sku, skus[sku] ]);
  }

  let sizes = function getSizes(skus){
    let sizes = [];
    if (skus){
      Object.keys(skus).forEach( sku =>{

        let skuData = skus[sku];

        if ( !sizes.includes( skuData.size) ) {
          if (skuData.quantity) {
            sizes.push(skus[sku].size);
          }
        }
      })
      if (sizes.length){
        sizes.unshift('Select Size');
      }
      return sizes;
    }
  }(skus);

  return(
    <select
      id='SizeSelector'
      data-testid='select-size'
      disabled={!sizes || !sizes.length}
      onChange={handleChange}
    >
      {
        sizes && sizes.length ?
        sizes.map( size =>{
          return(
            <option
              value={size}
              key={`sizeOption-${size}`}
              data-testid={`sizeOption-${size}`}
            >
              {size}
            </option>
          )
        })
        :
        <option value='OUT OF STOCK'>OUT OF STOCK</option>
      }
    </select>
  )
};