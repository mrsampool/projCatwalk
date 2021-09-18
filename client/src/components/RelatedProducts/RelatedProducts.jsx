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
      <p id='related-products-title'>Related Products</p>
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
        {
          !params.noDummy ?
            products.map( product =>{
            return(
                <Product
                  product={product}
                  key={`relatedProduct${product.id}`}
                />
              )
            })
            : null
        }
      </div>
    </div>
  );
};

export const Product = props => {

  const {id, category, name, default_price} = props.product;

  const [style, setStyle] = useState(null);

  let params = useContext(QueryContext);

  let rating, photo;

  function fetchStyles(){
    serverRequests.getProductStyles(id)
    .then( stylesData => {
      let defaultStyle = stylesData.results.find( style =>{
        return style['default?'];
      })
      setStyle( defaultStyle );
    })
    .catch( err => console.log(err) );
  }

  useEffect( ()=>{
    if (id){
      fetchStyles();
    }
  }, [props.product])

  return (
    <a
      className='product'
      target='_blank'
      href={`/products/${id}${params.noDummy ? '?noDummy' : ''}`}
    >
      <img
        className='productImg'
        src={ style ? style.photos[0].thumbnail_url : ''}
      />
      <div className='product-text'>
        <p className='product-card-category'>{category}</p>
        <p className='product-card-name'>{name}</p>
        <p className='product-card-price'>${default_price}</p>
        {
          rating ?
          'rating' : null
        }
      </div>
    </a>
  )
}