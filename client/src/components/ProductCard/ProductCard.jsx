//React
import React, { useContext, useState, useEffect } from 'react';

//Context
import { QueryContext } from '../../contexts/product-context';

// Utilities
import { serverRequests } from '../../utils/serverRequests';

// Dummy Data
import { singleProductStyles } from '../../dummyData/productsList';

//Stylesheet
import './ProductCard.css'

export const ProductCard = (props) =>{

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
      if (props.noDummy){
        fetchStyles();
      } else {
        setStyle( singleProductStyles.results[0] )
      }
    }
  }, [props.product])

  return (
    <a
      className='product'
      target='_blank'
      href={`/products/${id}${props.noDummy ? '?noDummy' : ''}`}
    >
      <img
        className='productImg'
        src={ style && style.photos ? style.photos[0].thumbnail_url : ''}
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
};