import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js'

async function loadPage() {
  try {

    //throw 'error1';
    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      //throw 'error2';
      loadCart(() => {
        //reject('error3')
        resolve();
      });
    });

    renderOrderSummary();
    renderPaymentSummary();

  } catch (error) {
    console.log('Unexpected error. Please try again later.')
  }

}

loadPage();
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});

*/
/*
// start promise, call asyn function which will finish loading products. we stop until func finishes and then resolve is called. calling resolve goes to the next step which runs the final function
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  })
}).then((value) => {
  console.log(value)
  return   new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
loadProducts(() => {
  // console.log('checkout page case')
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  })
});
*/