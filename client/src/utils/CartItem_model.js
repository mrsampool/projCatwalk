export class CartItem{
  constructor(product, style, sku, qty){
    this.name = product.name;
    this.styleName = style.name;
    this.sku = sku[0];
    this.size = sku[1].size;
    this.qty = Number(qty);
    this.pricePer = Number(style.sale_price || style.original_price || product.default_price);
    this.priceTotal = Number(this.qty * this.pricePer);
    this.photo = style.photos ? style.photos[0].thumbnail_url : null;
  }
}