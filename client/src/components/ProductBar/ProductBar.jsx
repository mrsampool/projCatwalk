//React
import React from 'react';

// Sub-Components
import { ProductCard } from '../ProductCard/ProductCard.jsx';

//Stylesheet
import './ProductBar.css'

export const ProductBar = (props) =>{

  const {products, title, noDummy} = props;

  return (
    <div id='related-products'>
      <p id='related-products-title'>{title}</p>
      <div id='related-product-list'>
        {
          products.map( product =>{
            return(
              <ProductCard
                product={product}
                key={`relatedProduct${product.id}`}
                noDummy={noDummy}
              />
            )
          })
        }
        {
          !noDummy ?
            products.map( product =>{
            return(
                <ProductCard
                  product={product}
                  key={`relatedProduct${product.id}`}
                  noDummy={noDummy}
                />
              )
            })
            : null
        }
      </div>
    </div>
  )
};