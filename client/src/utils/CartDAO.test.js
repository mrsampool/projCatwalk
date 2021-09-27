import {Cart, CartDAO} from "./CartDAO";

//Test Data
import {singleProduct as product} from "../dummyData/productsList";
import {singleProductStyles as styles} from "../dummyData/productsList";
let style = styles.results[0];

let sku1 = [
  Object.keys(style.skus)[0],
  style.skus[ Object.keys(style.skus)[0] ]
];
let itemData1 = [product, style, sku1, 1];

let sku2 = [
  Object.keys(style.skus)[1],
  style.skus[ Object.keys(style.skus)[1] ]
];
let itemData2 = [product, style, sku2, 2];

describe('Cart DAO', ()=>{

  describe('getItems()', ()=>{

    it ('should return an array', ()=>{
      let cart = new CartDAO();
      let items = cart.getItems();
      expect( Array.isArray(items) ).toBe( true );
    });

    it ('should be equal to local storage data', ()=>{

      let cart = new CartDAO();
      let firstItems = cart.getItems();
      let localItems = JSON.parse( window.localStorage.getItem(cart.storageKey) );
      expect( localItems === firstItems || localItems === null ).toBe( true );

    });

  });

  describe('addItems()', ()=>{

    it ('should create a cart item with the correct properties', ()=>{

      let cart = new CartDAO();
      let firstItems = cart.getItems();

      cart.addItem(...itemData1);

      let addedItem = cart.getItems().pop();

      [
        ['name','string'],
        ['styleName','string'],
        ['sku','string'],
        ['size','string'],
        ['qty','number'],
        ['pricePer','number'],
        ['priceTotal','number'],
        ['photo','string'],
      ].forEach( property =>{

        let propName = property[0];
        let propType = property[1];

        expect( addedItem ).toHaveProperty( propName );
        expect( typeof addedItem[propName] ).toBe( propType );
      });

      cart.replaceItems(firstItems);

    });

  });

  describe('getTotalPrice()', ()=>{

    it('should correctly calculate the total price', ()=>{

      let cart = new CartDAO();
      let firstItems = cart.getItems();
      let initialTotal = cart.getTotalPrice();

      cart.addItem(...itemData1);
      cart.addItem(...itemData1);
      cart.addItem(...itemData2);

      expect( cart.getTotalPrice() ).toBe( initialTotal + 560 );

      cart.replaceItems(firstItems);

    });

  });

  describe('getItemCount()', ()=>{

    it('should correctly calculate the total items', ()=>{

      let cart = new CartDAO();
      let firstItems = cart.getItems();
      let initialCount = cart.getItemCount();

      cart.addItem(...itemData1);
      cart.addItem(...itemData1);
      cart.addItem(...itemData2);

      expect( cart.getItemCount() ).toBe( initialCount + 4 );

      cart.replaceItems(firstItems);

    });

  });

  describe('decreaseItem()', ()=>{

    it('should decrease an item\'s quantity if there is more than one', ()=>{

      let cart = new CartDAO();
      let firstItems = cart.getItems();
      let initialItem = cart.getBySku(sku1[0]);
      let initialCount = initialItem ? initialItem.qty : 0;

      cart.addItem(...itemData1);
      cart.addItem(...itemData1);
      cart.decreaseItem(sku1[0]);

      expect( cart.getBySku(sku1[0]).qty ).toBe( initialCount + 1 );

      cart.replaceItems(firstItems);

    });

    it('should remove an item if there is only one', () => {

      let altItemData = itemData1;
      let altSku = '1234567890xxxxx';
      altItemData[2] = altSku;

      let cart = new CartDAO();
      let firstItems = cart.getItems();

      let initialItem = cart.getBySku(altSku);
      let initialCount = initialItem ? initialItem.qty : 0;

      cart.addItem(...altItemData);
      cart.decreaseItem(altSku);

      expect( cart.getBySku(altSku) ).toBeFalsy();

      cart.replaceItems(firstItems);
    });

  });

  describe('removeItem()', ()=>{

    it('should remove an item with more than 1 qty', ()=>{

      let cart = new CartDAO();
      let firstItems = cart.getItems();
      let initialItem = cart.getBySku(sku1[0]);
      let initialCount = initialItem ? initialItem.qty : 0;

      cart.addItem(...itemData1);
      cart.addItem(...itemData1);
      cart.addItem(...itemData1);
      cart.removeItem(sku1[0]);

      expect( cart.getBySku(sku1[0]) ).toBeFalsy();

      cart.replaceItems(firstItems);

    });

    it('should remove an item with 1 qty', ()=>{

      let cart = new CartDAO();
      let firstItems = cart.getItems();
      let initialItem = cart.getBySku(sku1[0]);
      let initialCount = initialItem ? initialItem.qty : 0;

      cart.addItem(...itemData1);
      cart.removeItem(sku1[0]);

      expect( cart.getBySku(sku1[0]) ).toBeFalsy();

      cart.replaceItems(firstItems);

    });

  });

});