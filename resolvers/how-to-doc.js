const connectToMongoDB = require('../helpers/db');
const Howtodoc = require('../models/how-to-doc')();
const helper = require('../helpers/helper');
const Like = require('./../models/like')();
let conn;

async function addHowtodoc(_, { howtodoc }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            if (howtodoc.tags && howtodoc.tags.length) {
                howtodoc.tags = await helper.insertManyIntoTags(howtodoc.tags);
            }


            const int = await new Howtodoc(howtodoc);
            await int.save(howtodoc).then(async p => {
                console.log(p)

                p.populate('createdBy').populate('tags').execPopulate().then(populatedHowtodoc => {
                    return resolve(populatedHowtodoc);
                })
                // return resolve([a]);

            });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getHowtodocsByUserId(_, { userId, status }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Howtodoc.find({ 'createdBy': userId, status: status ? status : { $ne: null} }).populate('createdBy').populate('tags').exec((err, res) => {

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

async function getHowtodocById(_, { howtodocId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Howtodoc.findById(howtodocId).populate('createdBy').populate('tags').exec( async(err, res) => {

                if (err) {
                    return reject(err)
                }

                const likeCount = await Like.count({referenceId: howtodocId})

                res['likeCount'] = likeCount;

                return resolve(res);
            });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getAllHowtodocs(_, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Howtodoc.find({status: 'Published'}).populate('createdBy').populate('tags').exec((err, res) => {

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

async function updateHowtodoc(_, { howtodoc }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            if (howtodoc.tags && howtodoc.tags.length) {
                howtodoc.tags = await helper.insertManyIntoTags(howtodoc.tags);
            }


            await Howtodoc.findByIdAndUpdate(howtodoc._id, howtodoc, {new: true}, (err, res) => {
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

async function deleteHowtodoc(_, { howtodocId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Howtodoc.deleteOne({_id: howtodocId}, ((err, res) => {

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
    addHowtodoc,
    getHowtodocsByUserId,
    getHowtodocById,
    getAllHowtodocs,
    updateHowtodoc,
    deleteHowtodoc
}