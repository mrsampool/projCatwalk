//React
import React, {useContext, useState, useEffect} from 'react';

// Context
import { CartContext } from "../../contexts/CartContext";

//Stylesheet
import './InBag.css' 
export const InBag = (props) =>{

  const { cartAccess } = useContext(CartContext);
  const [bagCount, setBagCount] = useState( 0 );

  function bagItemCount(items){
    if (props.sku && props.sku[0]){
      let inBag = items.find( item => {
        return item.sku === props.sku[0];
      })
      if (inBag){ return inBag.qty; }
    }
    else { return 0; }
  }

  function checkBagStatus(items){
    setBagCount( bagItemCount(items) );
  }

  cartAccess.statusStateSetter = checkBagStatus;

  useEffect( ()=>{
    checkBagStatus( cartAccess.getItems() );
  }, [props.sku])

  return (
    bagCount
    ?
    <span id='InBag'>
      ITEM IN <a href='/cart'>BAG</a> ( x{bagCount} )
    </span>
    : null
  )
};