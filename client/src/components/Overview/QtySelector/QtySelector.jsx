//React
import React, {useState} from 'react';

//Stylesheet
import './QtySelector.css'

export const QtySelector = (props) =>{
  const {sku} = props;

  function handleChange(e){
    props.setQty( Number(e.target.value) );
  }

  function getMaxQty(size, skus){

    let selectedSku = function(){
      let selected;

      Object.keys(skus).forEach( sku => {
        if (skus[sku].size === size){
          selected = skus[sku];
          return;
        }
      })
      return selected;
    }();

    let inStock = selectedSku ? selectedSku.quantity : 0;
    return inStock < 15 ? inStock : 15;
  }

  let renderOptions = function() {

    let max = sku.quantity < 15 ? sku.quantity : 15;
    let i = 1;
    let options = [];

    while(i <= max){
      options.push(
        <option value={i} key={`qtyOption-${i}`}>
          {i}
        </option>
      );
      i++;
    }
    return options;
  }

  return (
    <select
      defaultValue={sku ? '1' : '-'}
      disabled={!sku ? true : false}
      data-testid='QtySelector'
      onChange={handleChange}
    >

      {
        sku ?
        renderOptions()
        :
        <option value='-'>-</option>
      }
    </select>
  )
};