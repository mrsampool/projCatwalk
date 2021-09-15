import { serverRequests } from './serverRequests';
let { getCart, addToCart } = serverRequests;

// IMPORTANT NOTE:
// The methods below (getCart & addToCart) have been tested and are passing as of 9.15.21 2:40pm
// They are now x'd out so as not to run API calls every time the test suites are ran
// In order to test that these methods are still functioning properly, change the "xit"s to "it"s

describe('getCart', ()=>{

  it('should return an array', ()=>{

    return getCart().then( res =>{
      expect( Array.isArray(res) ).toBe( true );
    })
    .catch( err => console.log(err) );

  })

})

describe('addToCart', ()=>{

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

});