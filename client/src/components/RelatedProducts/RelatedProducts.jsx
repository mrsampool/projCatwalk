//React
import React, { useContext, useState, useEffect } from 'react';

//Context
import { ProductContext } from '../../contexts/ProductContext';
import { QueryContext } from "../../contexts/QueryContext";

// Sub-Components
import { ProductBar } from '../ProductBar/ProductBar.jsx';

// Utilities
import { serverRequests } from '../../utils/serverRequests';

// Dummy Data
import { relatedProducts } from '../../dummyData/relatedProducts';

// Placeholder Data
import {loadingProductCards} from "../../dummyData/placeholderData";

export const RelatedProducts = (props) =>{

  const [products, setProducts] = useState(loadingProductCards);

  let currentId;
  let context = useContext(ProductContext);
  if(context && context.currentProduct){
    currentId = context.currentProduct.id;
  }
  let params = useContext(QueryContext);

  function fetchProducts(){
    serverRequests.getRelatedProducts(currentId)
    .then( products => setProducts(products) )
    .catch( err => console.log(err) );
  }

  useEffect( ()=>{
    if (currentId){
      fetchProducts();
    }
  },[currentId])

  return (
    <ProductBar
      title='Related Products'
      products={products}
    />
  );
};