const mongoose = require('mongoose');
const { Schema } = mongoose;
const support  = require('./support');


const howtodocSchema = new Schema(
    {
        name: String,
        description: [],
        type: {
            type: String,
            default: 'howtodoc'
        },
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
        return mongoose.model('howtodoc');
    } catch (e) {
        return mongoose.model('howtodoc', howtodocSchema);
    }

};
