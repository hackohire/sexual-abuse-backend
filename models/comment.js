const mongoose = require('mongoose');
const { Schema } = mongoose;


const commentSchema = new Schema(
    {
        parentId: {
            type: Schema.Types.ObjectId,
            default: null
        },
        referenceId: {
            type: Schema.Types.ObjectId // Id of a product / help-request / requirement / interview
        },
        children: [{
            type: Schema.Types.ObjectId,
            ref: 'comment',
            default: []
        }],
        parents: [{
            type: Schema.Types.ObjectId,
            ref: 'comment',
            default: []
        }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
            // required: true
        },
        type: {
            type: String,
            enum: ['product', 'help-request', 'requirement', 'interview', 'testing', 'howtodoc', 'design'],
        },
        status: {
            type: String,
            enum: ['Created', 'Submitted', 'Approved', 'Rejected', 'Archieved', 'Deleted', 'Published', 'Unpublished', 'Resolved'],
            default: 'Created'
        },
        text: []
    },
    {
        timestamps: true,
    },
);

module.exports = () => {
    try {
        return mongoose.model('comment');
    } catch (e) {
        return mongoose.model('comment', commentSchema);
    }
};
