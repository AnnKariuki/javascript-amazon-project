export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));
  //getItem returns the string version of the array. We need to convert back to array using JSON.parse

  // if we dont have a cart in storage cart === NULL so NOT NULL (!cart) becomes truthy, so set the default cart
  if (!cart) {
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionsId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionsId: '2'
    }];
  }

}

function saveToStorage() {
  //local storage only saves strings
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionsId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  //XMLHttpRequest (XHR) objects are used to interact with servers. You can retrieve data from a URL without having to do a full page refresh. 
  // This enables a Web page to update just part of a page without disrupting what the user is doing.
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
   //convert json response to javascript object then convert them to Product and Clothing objects
    console.log(xhr.response)
    // console.log('load products');

    //wait for http request to come back with response then run the follow up code
    fun();
  });

  // console.log(typeof(fun))
  // console.log('which case')


  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  //.send() is asynchronous, it will just send a request and not wait for a response to come back. In order to wait for a response we need to have an event listener on the object 
  // waiting for the response to load
  xhr.send();
}
