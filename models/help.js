const mongoose = require('mongoose');
const { Schema } = mongoose;
const support  = require('./support');


const snippet = new Schema(
    {
        language: String,
        r: Number,
        second_best: {},
        top: {},
        value: String
    }
);


const helpRequestSchema = new Schema(
    {
        name: String,
        description: [],
        type: {
            type: String,
            default: 'help-request'
        },
        price: Number,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
            // required: true
        },
        email: String,
        status: {
            type: String,
            enum: ['Created', 'Submitted', 'Drafted', 'Published', 'Unpublished', 'Approved', 'Rejected', 'Archieved', 'Deleted', 'Resolved'],
            default: 'Drafted'
        },
        categories: { type: Array, default: [] },
        demo_url: String,
        documentation_url: String,
        video_url: String,
        snippets: [snippet],
        shortDescription: String,
        tags: [{
            type: Schema.Types.ObjectId,
            ref: "tag",
        }],
        support: support
    },
    {
        timestamps: true,
    },
);

module.exports = () => {
    try {
        return mongoose.model('help-request');
    } catch (e) {
        return mongoose.model('help-request', helpRequestSchema);
    }
};
