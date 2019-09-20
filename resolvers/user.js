const connectToMongoDB = require('./../helpers/db');
const auth = require('./../helpers/auth');
const User = require('./../models/user')();
var array = require('lodash/array');
const Like = require('./../models/like')();

let conn;

async function getUsers(_, { _page = 1, _limit = 10 }, { headers, db, decodedToken }) {
    console.log(decodedToken);
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(headers);
            // await auth.auth(headers);
            console.log(db)
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            const users = await User.find()
                .limit(_limit)
                .skip((_page - 1) * _limit);

            // await db.disconnect();
            return resolve(users);
            
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function createUser(_, { user }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {
            let decodeToken;
            await decodedToken.then((res, err) => {
                console.log(res);
               decodeToken = res; 
            })
            // const decodedToken = await auth.auth(headers);
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }


            let options = { upsert: true, new: true, setDefaultsOnInsert: true };
            
            await User.findOneAndUpdate({email: user.email}, user, options, async (err, u) => {
                if(err) {
                    return (err);
                }

                if(u) {
                    return resolve(u);
                }

            // await db.disconnect();
                
            });
            
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function updateUser(_, { user }, { headers, db }) {
    return new Promise(async (resolve, reject) => {
        try {
            // await auth(headers);

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            // const userToBeSaved = await new User(user);
            await User.findByIdAndUpdate(user._id, user, {new:true}).then(userCreated => {
                console.log(userCreated)
                return resolve(userCreated);
            });

            // await db.disconnect();
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function authorize(_, { applicationId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = {
                'email': decodedToken.email,
                'name': decodedToken.name,
                'roles': ['User'],
                'applications': [applicationId]
            }

            // const decodedToken = await auth.auth(headers);
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }


            // let options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false };

            await User.findOne({email: user.email}, (err, res) => {
                if(err) {
                    reject(err);
                }

                if(res) {
                    // console.log(res.applications);
                    res.name = user.name;
                    res.roles = array.union(user.roles, res.roles);
                    res.email = user.email;
                    // res.applications = array.union([applicationId], res.applications.map(x => x.toString()));
                    res.save(res, (err, res) => {
                        if(err) reject(err);

                        if(res) {
                            resolve(res); 
                        }
                    })
                } else {
                    user = new User(user);
                    user.save(user).then(u => {
                        if(u) {
                            resolve(u);
                        }
                    })
                }
            })
            
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getUsersAndBugFixesCount(_, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {
            // const decodedToken = await auth.auth(headers);
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }


            // let options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false };

            const userData = await User.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'createdBy',
                        as: 'productData'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        productCount: {$size: '$productData'}
                    }
                }
            ]).exec();

            return resolve(userData);
            
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

// Lambda Function to get the user Data by Id
async function getUserById(_, { userId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {
            // const decodedToken = await auth.auth(headers);
            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }


            // Getting user Data by passing the userId
            User.findById(userId).exec( async (err, res) => {

                // if error, reject with error
                if (err) {
                    return reject(err)
                }

                const likeCount = await Like.count({referenceId: userId})

                res['likeCount'] = likeCount;

                return resolve(res);
            });
            
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}



module.exports = {
    getUsers,
    createUser,
    updateUser,
    authorize,
    getUsersAndBugFixesCount,
    getUserById
};
