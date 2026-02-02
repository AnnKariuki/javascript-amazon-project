import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
//the tests fail when we had export let cart = JSON.parse(localStorage.getItem('cart')); in cart.js. This is because the cart was loaded immediately when the cart was imported so the test had no 
// chance to mock to spy first. The cart was already locked in so adding a new item to the cart would have unexpected number of items not 1. So by the time your test does: export let cart = JSON.parse(localStorage.getItem('cart'));
//localStorage.getItem('cart') has already been called for real, and your fallback code likely set the default cart (2 items). Then addToCart() adds another item, so cart.length is not 1.

//FIX
// Move initialization OF CART into a function in cart.js and call it when needed. Load cart only when I explicitly ask for it
//Order of events is now:

// Test mocks localStorage.getItem

// Test calls loadFromStorage

// cart is initialized using the mocked value

// addToCart modifies that controlled cart

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        })
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        //add the same product we expect only the quantity to change

    });

    it('adds a new product to the cart', () => {

        //We want to mock localStorage.setItem cause we don't want our tests to affect actual localStorage. We mock it first before addtocart so that we prevent local storage from tampering
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        })
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        //since setItem is mocked(does nothing) we can't really check what is saved in localStorage. What we can do to check if add to cart saves to localstorage at the end is we can see if localstorage.setItem
        //was called at sometime during the running of addToCart
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
})