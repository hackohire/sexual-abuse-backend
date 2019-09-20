const mongoose = require('mongoose');
const { Schema } = mongoose;


const cartItemSchema = new Schema(
    {
        referenceId: {
            type: Schema.Types.ObjectId, // Id of a product
            ref: 'product'
        },
        itemType: String,
        user: {
            type: Schema.Types.ObjectId, // Id of a product
            ref: 'user'
        },
    },
    {
        timestamps: true,
    },
);

module.exports = () => {
    try {
        return mongoose.model('cartitem');
    } catch (e) {
        return mongoose.model('cartitem', cartItemSchema);
    }
};
