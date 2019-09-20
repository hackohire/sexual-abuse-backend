const mongoose = require('mongoose');
const { Schema } = mongoose;


const likeSchema = new Schema(
    {
        referenceId: {
            type: Schema.Types.ObjectId // Id of a product / help-request / requirement / interview / how-to-do / testing / design
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            // required: true
        },
        type: {
            type: String,
            enum: ['user', 'product', 'help-request', 'requirement', 'interview', 'testing', 'design', 'howtodoc'],
        },
    },
    {
        timestamps: true,
    },
);

module.exports = () => {
    try {
        return mongoose.model('like');
    } catch (e) {
        return mongoose.model('like', likeSchema);
    }
};
