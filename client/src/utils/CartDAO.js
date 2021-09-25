import { CartItem } from "./CartItem_model";

export class CartDAO{
  constructor() {
    this.storage = window.localStorage;
    this.storageKey = 'ascentSquadCart';
    this.items = JSON.parse( this.storage.getItem(this.storageKey) ) || [];
    this.size = this.getItemCount();
  }
  syncStorage(){
    this.size = this.getItemCount();
    this.storage.setItem( this.storageKey, JSON.stringify(this.items) );
    if ( this.itemStateSetter ){
      this.itemStateSetter( this.getItems() );
    }
    if (this.statusStateSetter){
      console.log('statusStateSetter');
      this.statusStateSetter(this.items );
    }
    if (this.sizeStateSetter){
      this.sizeStateSetter(this.size);
    }
  }
  getItems(){ return this.items; }
  getItemCount(){
    return this.items.reduce( (a,b) =>{
      return a + b.qty;
    }, 0);
  }
  getTotalPrice(){
    return this.items.reduce( (a, b) =>{
      return a + b.priceTotal;
    }, 0);
  }
  getBySku(sku){
    return this.items.find( item => {
      return item.sku === sku;
    })
  }
  addItem(product, style, sku, qty){
    let itemInCart = this.getBySku(sku[0]);
    if (itemInCart){
      itemInCart.qty += qty;
      itemInCart.priceTotal = itemInCart.pricePer * itemInCart.qty;
    } else {
      let item = new CartItem(...arguments);
      this.items.push(item);
    }
    console.log('added');
    this.syncStorage();
  }
  removeItem(skuId){
    this.items = this.items.filter( item =>{
      return item.sku !== skuId;
    });
    this.syncStorage();
  }
  increaseItem(skuId){
    let itemInCart = this.getBySku(skuId);
    if (itemInCart){
      itemInCart.qty ++;
      this.syncStorage();
    }
  }
  decreaseItem(skuId){
    let itemInCart = this.getBySku(skuId);
    if (itemInCart){
      if (itemInCart.qty >= 2){
        itemInCart.qty --;
      } else {
        this.removeItem(skuId);
      }
      this.syncStorage();
    }
  }
  replaceItems( replacementItems ){
    this.items = replacementItems;
    this.syncStorage();
  }
}