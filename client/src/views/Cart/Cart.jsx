// Libraries
import React, {useContext, useState, useEffect} from "react";

// Sub-Components
import {Icon} from "../../components/Icon/Icon.jsx";

// Context
import {CartContext} from "../../contexts/CartContext";

// Style Sheet
import './Cart.css';


export const Cart = (props) => {

  let { cartAccess } = useContext(CartContext);
  const [cartData, setCartData] = useState( cartAccess.getItems() );
  cartAccess.itemStateSetter = setCartData;

  return (
    <div id='Cart'>
      <h1>Your Cart</h1>
      <div id='table-wrap'>
        <table>
          <thead>
          <tr>
            {
              ['', 'Product', 'Style', 'Size', 'Quantity', 'Price',  'Item Total', 'Sku', 'Style ID', 'Product ID', '']
              .map( heading =>{
                return <td>{heading}</td>
              })
            }
          </tr>
          </thead>
          <tbody>
          {
            cartData.length ?
              cartData.map( item =>{
                return(
                  <CartTableRow
                    item={item}
                    key={`cartTableItem${item.sku_id}`}
                  />
                )
              })
              : <CartTableRow item={null}/>
          }
          </tbody>
          <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{cartAccess.size}</td>
            <td></td>
            <td>${cartAccess.getTotalPrice()}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

const CartTableRow = props => {

  let { cartAccess } = useContext(CartContext);

  function removeItem(){
    cartAccess.removeItem(props.item.sku);
  }

  let productLink;

  if (props.item){
    productLink = `/products/${props.item.prodId}?styleId=${props.item.styleId}`;
  }

  return (
    props.item ?
      <tr>
        {
          Object.keys( props.item )
          .sort( (a,b) => a === 'photo' ? -1 : 1 )
          .map( field =>{
            return(
              <TableData
                field={field}
                data={props.item[field]}
                link={productLink}
              />
            )
          })
        }
        <td>
          <button
            className={'remove-cart-item'}
            onClick={removeItem}
            aria-label={'Remove Item From Cart'}
          >
            <Icon type='exit' />
          </button>
        </td>
      </tr>
      :
      <tr>
        <td>Empty Cart</td>
      </tr>
  )
}

const TableData = (props) => {
  const {field, data} = props;

  function formatCellData(field, data){
    if (field === 'photo'){
      return (
        <img
          className={'cart-item-img'}
          src={props.data}
        />
      )
    } else if (field === 'pricePer' || field === 'priceTotal') {
      return `$${data}`;
    } else if (field === 'quantity') {
      return data;
    } else {
      return <a href={props.link}>{data}</a>;
    }
  }
  return(
    <td>
      <span>
        { formatCellData(field, data) }
      </span>
    </td>
  )
}