//React
import React, { useContext, useState, useEffect } from 'react';

//Context
import { ProductContext, QueryContext } from '../../contexts/product-context';

// Dummy Data
import { relatedProducts } from '../../dummyData/relatedProducts';

// Utilities
import { serverRequests } from '../../utils/serverRequests';
//Stylesheet
import './RelatedProducts.css'

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
    <div id='related-products'>
      <p>Related Products</p>
      <div id='related-product-list'>
        {
          products.map( product =>{
            return(
              <Product
                product={product}
                key={`relatedProduct${product.id}`}
              />
            )
          })
        }
      </div>
    </div>
  );
};

export const Product = props => {

  const {category, name, default_price} = props.product;
  let rating, photo;

  return (
    <div className='product'>
      <img className='productImg'/>
      <span>{category}</span>
      <span>{name}</span>
      <span>{default_price}</span>
      {
        rating ?
        'rating' : null
      }
    </div>
  )
}