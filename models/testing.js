const mongoose = require('mongoose');
const { Schema } = mongoose;
const support  = require('./support');


const testingSchema = new Schema(
    {
        name: String,
        type: {
            type: String,
            default: 'testing'
        },
        description: [],
        shortDescription: String,
        featuredImage: String,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
            // required: true
        },
        price: Number,
        categories: [],
        status: {
            type: String,
            enum: ['Created', 'Drafted', 'Published', 'Unpublished', 'Submitted', 'Approved', 'Rejected', 'Archieved', 'Deleted'],
            default: 'Drafted'
        },
        tags: [{
            type: Schema.Types.ObjectId,
            ref: "tag",
        }],
        support: support
    },
    {
        timestamps: true,
        id: true
    },
);



module.exports = () => {
    try {
        return mongoose.model('testing');
    } catch (e) {
        return mongoose.model('testing', testingSchema);
    }

};
