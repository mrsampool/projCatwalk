// Libraries
import React, {useContext, useState, useEffect} from "react";

// Style Sheet
import './Cart.css';
import {CartContext} from "../../contexts/CartContext";

export const Cart = (props) => {

  let { cart } = useContext(CartContext);

  const [cartData, setCartData] = useState([]);

  useEffect( ()=>{
    setCartData(cart);
  }, [cart]);

  return (
    <div id='Cart'>
      <h1>Your Cart</h1>
      <table>
        <thead>
          <tr>
            <td>Item SKU</td>
            <td>Quantity</td>
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
            <td>Total Items:</td>
            <td>{
              cartData.reduce( (a,b) => {
                return a + Number(b.count);
              }, 0)
            }</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

const CartTableRow = props => {

  return (
    <tr>
      <td className='cart-entry-sku'>{props.item ? props.item.sku_id : ''}</td>
      <td className='cart-entry-count'>{props.item ? props.item.count : ''}</td>
    </tr>
  );
}