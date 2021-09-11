//React
import React, {useState} from 'react';

//Stylesheet
import './qtySelector.css'

export const QtySelector = (props) =>{

  const [inStock, setInStock] = useState(true);

  const {size, skus} = props;

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
    if (!inStock) {setInStock(false)}
    return inStock < 15 ? inStock : 15;
  }

  let renderOptions = function() {

    let max = getMaxQty(size, skus);
    let options = [];

    while(max > 0){
      options.push(
        <option value={max} key={`qtyOption-${max}`}>
          {max}
        </option>
      );
      max--;
    }
    return options;
  }

  return (
    <select
      defaultValue={size && inStock ? '1' : '-'}
      disabled={!size ? true : false}
      data-testid='QtySelector'
    >
      {
        size && skus ?
        renderOptions()
        :
        <option value='-'>-</option>
      }
    </select>
  )
};