const mongoose = require('mongoose');
const { Schema } = mongoose;
const support  = require('./support');

const priceAndFiles = new Schema(
    {
        fileName: String,
        file: String,
        price: Number
    }
);

const snippet = new Schema(
    {
        language: String,
        r: Number,
        second_best: {},
        top: {},
        value: String
    }
);

const productSchema = new Schema(
    {
        name: String,
        type: {
            type: String,
            default: 'product'
        },
        description: [],
        shortDescription: String,
        featuredImage: String,
        parentId: Schema.Types.ObjectId,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
            // required: true
        },
        priceAndFiles: [priceAndFiles],
        price: Number,
        categories: [],
        demo_url: String,
        documentation_url: String,
        video_url: String,
        status: {
            type: String,
            enum: ['Created',  'Drafted', 'Published', 'Unpublished', 'Submitted', 'Approved', 'Rejected', 'Archieved', 'Deleted'],
            default: 'Drafted'
        },
        snippets: [snippet],
        tags: [{
            type: Schema.Types.ObjectId,
            ref: "tag",
        }],
        support: {
            type: support,
            default: null
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "comment", 
        }]
        // addedToCart: Boolean
    },
    {
        timestamps: true,
        id: true
    },
);



module.exports = () => {
    try {
        return mongoose.model('product');
    } catch (e) {
        return mongoose.model('product', productSchema);
    }

};
