import { serverRequests } from './serverRequests';
let { getCart, addToCart, getProductReviews, getProductReviewsMeta, getProducts } = serverRequests;

// IMPORTANT NOTE:
// The methods below have been tested and are passing as of 9.15.21
// They are now x'd out so as not to run API calls every time the test suites are ran
// In order to test that these methods are still functioning properly, change the "xdescribe"s to "describe"s

xdescribe('getCart', ()=>{

  it('should return an array', ()=>{

    return getCart().then( res =>{
      expect( Array.isArray(res) ).toBe( true );
    })
    .catch( err => console.log(err) );

  })

})

xdescribe('addToCart', ()=>{

  it('should add an item into the user\'s cart', ()=>{

    let testSku = '1549637';
    let count = 1;
    let preCartItem = 0;

    return getCart()
    .then( firstCart => {

      let matchingItem = firstCart[ firstCart.findIndex( item => item['sku_id'] == testSku )];
      if (matchingItem) { preCartItem = Number(matchingItem.count); }

      return addToCart(testSku, count)
    })
    .then( () => getCart() )
    .then( secondCart => {

      let matchingItem = secondCart[ secondCart.findIndex( item => item['sku_id'] == testSku )];
      let newCount = Number(matchingItem.count);

      expect( matchingItem ).toBeTruthy();
      expect( Number(matchingItem.count) > preCartItem ).toBeTruthy();
    })
    .catch( err => console.log(err) );
  });

})

xdescribe('Products API endpoint', () => {
  it('should return an array containing basic product information', (done) => {
    getProducts()
    .then( products => {
      expect( Array.isArray(products) ).toBe(true);
      expect( products[0] ).toHaveProperty('id');
      expect( products[0] ).toHaveProperty('description');
      done();
    })
    .catch( done );
  });
});

xdescribe('Reviews API endpoint', () => {
  it('should receive data from the /reviews/meta endpoint (product_id 44391)', (done) => {
    getProductReviewsMeta(44391)
    .then( data => {
      expect(data).toHaveProperty('product_id', '44391');
      done();
    })
    .catch( done );
  })

  it('should receive data from the /reviews endpoint (product_id 44391)', (done) => {
    getProductReviews(44391)
    .then( data => {
      expect(data).toHaveProperty('product', '44391');
      done();
    })
    .catch( done );
  })
});