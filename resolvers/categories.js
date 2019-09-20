const Category = require('../models/tag')();
const connectToMongoDB = require('../helpers/db');
let conn;

async function searchCategories(_, { keyWord }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }


            var regex = new RegExp(keyWord, 'i');
            const cat = await Category.find({ name: { $regex: regex } }).exec();

            return resolve(cat);




        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

module.exports = {
    searchCategories
}