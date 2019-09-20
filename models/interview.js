const mongoose = require('mongoose');
const { Schema } = mongoose;
const support  = require('./support');


const interviewSchema = new Schema(
    {
        name: String,
        type: {
            type: String,
            default: 'interview'
        },
        description: [],
        shortDescription: String,
        featuredImage: String,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
            // required: true
        },
        // priceAndFiles: [priceAndFiles],
        price: Number,
        categories: [],
        demo_url: String,
        // documentation_url: String,
        // video_url: String,
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
        // snippets: [snippet],
        // addedToCart: Boolean
    },
    {
        timestamps: true,
        id: true
    },
);



module.exports = () => {
    try {
        return mongoose.model('interview');
    } catch (e) {
        return mongoose.model('interview', interviewSchema);
    }

};
