const connectToMongoDB = require('../helpers/db');
const HelpRequest = require('../models/help')();
const helper = require('../helpers/helper');
// const sendEmail = require('../helpers/ses_sendTemplatedEmail');
const User = require('./../models/user')();
const Like = require('./../models/like')();
let conn;

async function addQuery(_, { helpQuery }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            console.log(helpQuery)
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            if (helpQuery.tags && helpQuery.tags.length) {
                helpQuery.tags = await helper.insertManyIntoTags(helpQuery.tags);
            }



            const h = await new HelpRequest(helpQuery);
            await h.save(helpQuery).then(async p => {
                console.log(p.description)
                p.populate('createdBy').populate('tags').execPopulate().then((populatedHelpRequest) => {
                    return resolve(populatedHelpRequest);
                })
                // return resolve([a]);

            });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getHelpRequestsByUserId(_, { userId, status }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            HelpRequest.find({ 'createdBy': userId, status: status ? status : { $ne: null} }).populate('createdBy').populate('tags').exec((err, res) => {

                if (err) {
                    return reject(err)
                }

                return resolve(res);
            });



        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getHelpRequestById(_, { helpRequestId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            HelpRequest.findById(helpRequestId).populate('createdBy').populate('tags').exec( async (err, res) => {

                if (err) {
                    return reject(err)
                }

                const likeCount = await Like.count({referenceId: helpRequestId})

                res['likeCount'] = likeCount;

                return resolve(res);
            });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getAllHelpRequests(_, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            HelpRequest.find({status: 'Published'}).populate('createdBy').populate('tags').exec((err, res) => {

                if (err) {
                    return reject(err)
                }

                return resolve(res);
            });



        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function updateHelpRequest(_, { helpRequest }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            if (helpRequest.tags && helpRequest.tags.length) {
                helpRequest.tags = await helper.insertManyIntoTags(helpRequest.tags);
            }


            await HelpRequest.findByIdAndUpdate(helpRequest._id, helpRequest, {new: true}, (err, res) => {
                if (err) {
                    return reject(err)
                }

                res.populate('createdBy').populate('tags').execPopulate().then((d) => {
                    return resolve(d);
                });
            });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}



async function deleteHelpRequest(_, { helpRequestId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            HelpRequest.deleteOne({ _id: helpRequestId }, ((err, res) => {

                if (err) {
                    return reject(err)
                }

                return resolve(res.deletedCount);
            })
            );



        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

module.exports = {
    addQuery,
    getHelpRequestsByUserId,
    getHelpRequestById,
    getAllHelpRequests,
    updateHelpRequest,
    deleteHelpRequest
}