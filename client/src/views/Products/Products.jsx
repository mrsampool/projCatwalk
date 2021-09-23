//React
import React, { useState, useEffect, useContext } from 'react';

// Sub-Components
import { ProductBar } from '../../components/ProductBar/ProductBar.jsx';
import { Banner } from '../../components/Banner/Banner.jsx';

// Utilities
import { serverRequests } from '../../utils/serverRequests';

//Stylesheet
import './Products.css'
import {loadingProductCards} from "../../dummyData/placeholderData";
import {loadingProductCategories} from "../../dummyData/placeholderData";

export const Products = (props) =>{

  const [products, setProducts] = useState([]);
  const [featCategory, setFeaturedCategory] = useState('Featured Products');

  function changeCategory(categoryName){
    setFeaturedCategory(categoryName);
    document.getElementById('product-list').scrollIntoView({behavior: 'smooth'});
  }

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
      return serverRequests.getProducts(10)
      .then( products =>{
        categories['Featured Products'] = products;

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
    });
  }

  useEffect( ()=>{
    if (!products.length){
      fetchProducts();
    }
  }, []);

  return (
    <div id='Products'>
      <div id='product-list'>
        {
          products.length ?
          <ProductBar
            title={featCategory}
            products={products.find( product =>{
              return product.name === featCategory;
            }).list}
            key={`featCategoryCard`}
            noDummy={'true'}
          />
          :
          <ProductBar
            title='Featured Products'
            products={loadingProductCards}
          />
        }
        <div id='prod-categories'>
          <p id='categories-heading'>Browse All Products</p>
          <div id='category-list'>
            {
              products.length ?
              products.map( category =>{
                return(
                  <ProductCategory
                    category={category}
                    setFeatured={changeCategory}
                    key={`product-category=${category.name}`}
                  />
                )
              })
              :
              loadingProductCategories.map( (emptyCategory, index) =>{
                return(
                  <ProductCategory
                    category={emptyCategory}
                    setFeatured={null}
                    key={`empty-category=${index}`}
                  />
                )
              })
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export const ProductCategory = (props) => {

  const [thumbnail, setThumbnail] = useState(null);

  const {name, list} = props.category;
  const featuredItem = list[0];

  function handleClick(){
    props.setFeatured(name);
  }

  function fetchItem(){
    serverRequests.getProductStyles(featuredItem.id)
    .then( styleData =>{
      let featuredStyle = styleData.results.find( style =>{
        return style['default?'];
      }) || styleData.results[0];
      if (featuredStyle && featuredStyle.photos){
        setThumbnail(featuredStyle.photos[0].thumbnail_url);
      }
    })
  }

  useEffect( ()=>{
    if (!thumbnail && featuredItem.id){
      fetchItem();
    }
  },[props.category])

  return(
    <div
      className='prod-category'
      onClick={ handleClick }
    >
      <p>{name}</p>
      <div id='category-thumbnail'>
        <img src={thumbnail} alt=''/>
      </div>
    </div>
  )
}