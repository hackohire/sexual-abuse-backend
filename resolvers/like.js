const connectToMongoDB = require('../helpers/db');
const helper = require('../helpers/helper');
const sendEmail = require('../helpers/ses_sendTemplatedEmail');
const Like = require('./../models/like')();
const User = require('./../models/user')();
let conn;


async function like(_, { like, liked }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            // Check if DB is already connected, Otherwise Make a new connection
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            let savedOrDeleteLike;

            if (liked) {
                const likeItem = await new Like(like);

                const savedOrDeleteLike = await likeItem.save();
            } else {
                const savedOrDeleteLike = await Like.findOneAndDelete({referenceId: like.referenceId, userId: like.userId}).exec();
            }

            console.log(savedOrDeleteLike);

            const likeCount = await Like.count({referenceId: like.referenceId}).exec();
            const likedOrNot = await Like.count({referenceId: like.referenceId, userId: like.userId, type: like.type}).exec();


            await resolve({likeCount: likeCount, liked: likedOrNot});

            

        }
        // Catch the error and print it in the console
        catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function checkIfUserLikedAndLikeCount(_, { userId, referenceId, type }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            // Check if DB is already connected, Otherwise Make a new connection
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }


            const likeCount = await Like.count({referenceId: referenceId, type: type}).exec();
            const liked = await Like.count({referenceId: referenceId, userId: userId, type: type});

            // saving the item in the cart
            await resolve({likeCount: likeCount, liked: liked});

            

        }
        // Catch the error and print it in the console
        catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}






module.exports = {
    like,
    checkIfUserLikedAndLikeCount
}