const connectToMongoDB = require('../helpers/db');
const helper = require('../helpers/helper');
const sendEmail = require('../helpers/ses_sendTemplatedEmail');
const Cart = require('./../models/cart')();
let conn;


async function addToCart(_, { userId, referenceId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            // Check if DB is already connected, Otherwise Make a new connection
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            // creating an object to be added into the cart
            const item = {
                referenceId: referenceId, // reference to the bugfix
                user: userId // loggedInUserId
            }

            // creating mongoose model of the item
            const cartItem = await new Cart(item);

            // saving the item in the cart
            const savedcartItem = await cartItem.save(item);

            // return the items of the cartlist
            const cartList = await returnCartListItems(userId)

            return resolve(cartList);

        }
        // Catch the error and print it in the console
        catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getCartItemsList(_, { userId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            // Check if DB is already connected, Otherwise Make a new connection
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            // return the items of the cartlist
            const cartList = await returnCartListItems(userId);

            return resolve(cartList);

        } 
        // Catch the error and print it in the console
        catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function removeItemFromCart(_, { userId, referenceId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            // Check if DB is already connected, Otherwise Make a new connection
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            // Removing an Item from the cartList, finding it by reference ID
            const deleteCartItem = await Cart.findOneAndDelete({referenceId: referenceId}).exec();

            // return the items of the cartlist
            const cartList = await returnCartListItems(userId);

            return resolve(cartList);

        }

        // Catch the error and print it in the console 
        catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function returnCartListItems(userId) {
    return new Promise(async (resolve, reject) => {
        try {

            const cartList = await Cart.find({user: userId}).
            populate({path: 'referenceId', populate: {path: 'tags'}}).populate('user').exec();

            return resolve(cartList);

        }
        // Catch the error and print it in the console
        catch (e) {
            console.log(e);
            return reject(e);
        }
    })

}



module.exports = {
    addToCart,
    getCartItemsList,
    removeItemFromCart
}