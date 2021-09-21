//React
import React, { useState, useEffect, useContext } from 'react';

//Context
import { QueryContext } from '../../contexts/product-context';

// Sub-Components
import { ProductBar } from '../../components/ProductBar/ProductBar.jsx';
import { Banner } from '../../components/Banner/Banner.jsx';

// Utilities
import { serverRequests } from '../../utils/serverRequests';

//Stylesheet
import './Products.css'

export const Products = (props) =>{

  const [products, setProducts] = useState([]);

  let params = useContext(QueryContext);

  console.log(params);

  function fetchProducts(){
    serverRequests.getProducts(50)
    .then( products => {
      let categories = {};
      products.forEach( product => {
        if (categories[product.category]){
          categories[product.category].push(product);
        } else {
          categories[product.category] = [product];
        }
      });
      let categoryList = [];
      Object.keys( categories ).forEach( categoryKey =>{
        categoryList.push(
          {
            name: categoryKey,
            list: categories[categoryKey]
          }
        );
      });
      categoryList.sort( (a,b) =>{
        return a.list.length > b.list.length ? -1 : 1;
      })
      setProducts( categoryList );
    });
  }

  useEffect( ()=>{
    if (!products.length){
      fetchProducts();
    }
  })


  return (
    <div id='Products'>
      <Banner/>
      <div id='product-list'>
        {
          products.length ?
          products.map( category =>{
            return(
              <ProductBar
                title={category.name}
                products={category.list}
                key={`ProductCategory-${category.name}`}
                noDummy={'true'}
              />
            )
          })
          : null
        }
      </div>
    </div>
  );
};