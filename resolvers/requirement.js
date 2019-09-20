const connectToMongoDB = require('../helpers/db');
const Requirement = require('../models/requirement')();
const helper = require('../helpers/helper');
const Like = require('./../models/like')();
let conn;

async function addRequirement(_, { requirement }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            if (requirement.tags && requirement.tags.length) {
                requirement.tags = await helper.insertManyIntoTags(requirement.tags);
            }


            const int = await new Requirement(requirement);
            await int.save(requirement).then(async p => {
                console.log(p)
                p.populate('createdBy').populate('tags').execPopulate().then(populatedRequirement => {
                    return resolve(populatedRequirement);
                })
                // return resolve([a]);

            });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getRequirementsByUserId(_, { userId, status }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Requirement.find({ 'createdBy': userId, status: status ? status : { $ne: null} }).populate('createdBy').populate('tags').exec((err, res) => {

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

async function getRequirementById(_, { requirementId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Requirement.findById(requirementId).populate('createdBy').populate('tags').exec( async (err, res) => {

                if (err) {
                    return reject(err)
                }

                const likeCount = await Like.count({referenceId: requirementId})

                res['likeCount'] = likeCount;

                return resolve(res);
            });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getAllRequirements(_, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Requirement.find({status: 'Published'}).populate('createdBy').populate('tags').exec((err, res) => {

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


async function updateRequirement(_, { requirement }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            if (requirement.tags && requirement.tags.length) {
                requirement.tags = await helper.insertManyIntoTags(requirement.tags);
            }


            await Requirement.findByIdAndUpdate(requirement._id, requirement, {new: true}, (err, res) => {
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



async function deleteRequirement(_, { requirementId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Requirement.deleteOne({ _id: requirementId }, ((err, res) => {

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
    addRequirement,
    getRequirementsByUserId,
    getRequirementById,
    getAllRequirements,
    updateRequirement,
    deleteRequirement
}