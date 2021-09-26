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
    if (props.prodId ){
      let count = 0;
      items.forEach( item =>{
        if (item.prodId === props.prodId){
          count += item.qty;
        }
      })
      return count;
    }
    else { return 0; }
  }

  function checkBagStatus(items){
    setBagCount( bagItemCount(items) );
  }

  if (cartAccess){
    cartAccess.statusStateSetter = checkBagStatus;
  }

  useEffect( ()=>{
    if (cartAccess){
      checkBagStatus( cartAccess.getItems() );
    }
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