const connectToMongoDB = require('../helpers/db');
const Design = require('../models/design')();
const helper = require('../helpers/helper');
const Like = require('./../models/like')();
let conn;

async function addDesign(_, { design }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            if (design.tags && design.tags.length) {
                design.tags = await helper.insertManyIntoTags(design.tags);
            }


            const int = await new Design(design);
            await int.save(design).then(async p => {
                console.log(p)

                p.populate('createdBy').populate('tags').execPopulate().then(populatedDesign => {
                    return resolve(populatedDesign);
                })
                // return resolve([a]);

            });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getDesignsByUserId(_, { userId, status }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Design.find({ 'createdBy': userId, status: status ? status : { $ne: null} }).populate('createdBy').populate('tags').exec((err, res) => {

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

async function getDesignById(_, { designId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Design.findById(designId).populate('createdBy').populate('tags').exec( async (err, res) => {

                if (err) {
                    return reject(err)
                }
                const likeCount = await Like.count({referenceId: designId})

                res['likeCount'] = likeCount;
                return resolve(res);
            });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getAllDesigns(_, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Design.find({status: 'Published'}).populate('createdBy').populate('tags').exec((err, res) => {

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

async function updateDesign(_, { design }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            if (design.tags && design.tags.length) {
                design.tags = await helper.insertManyIntoTags(design.tags);
            }


            await Design.findByIdAndUpdate(design._id, design, {new: true}, (err, res) => {
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

async function deleteDesign(_, { designId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Design.deleteOne({_id: designId}, ((err, res) => {

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
    addDesign,
    getDesignsByUserId,
    getDesignById,
    getAllDesigns,
    updateDesign,
    deleteDesign
}