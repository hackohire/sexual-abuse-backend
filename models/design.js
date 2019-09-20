const mongoose = require('mongoose');
const { Schema } = mongoose;
const support  = require('./support');


const designSchema = new Schema(
    {
        name: String,
        description: [],
        shortDescription: String,
        type: {
            type: String,
            default: 'design'
        },
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
            default: 'Created'
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
        return mongoose.model('design');
    } catch (e) {
        return mongoose.model('design', designSchema);
    }

};