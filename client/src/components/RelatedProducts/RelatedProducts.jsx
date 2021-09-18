//React
import React, { useContext, useState, useEffect } from 'react';

//Context
import { ProductContext, QueryContext } from '../../contexts/product-context';

// Sub-Components
import { ProductBar } from '../ProductBar/ProductBar.jsx';

// Utilities
import { serverRequests } from '../../utils/serverRequests';

// Dummy Data
import { relatedProducts } from '../../dummyData/relatedProducts';

export const RelatedProducts = (props) =>{

  const [products, setProducts] = useState([]);

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
    if (currentId && !products.length){
      if (params.noDummy){
        fetchProducts();
      } else {
        setProducts( relatedProducts )
      }
    }
  },[currentId])

  return (
    <ProductBar
      title='Related Products'
      products={products}
      noDummy={params.noDummy}
    />
  );
};