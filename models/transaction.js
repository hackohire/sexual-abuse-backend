const mongoose = require('mongoose');
const { Schema } = mongoose;


const linkSchema = new Schema(
    {
        href: String,
        method: String,
        rel: String,
        title: String
    }
);

const payerSchema = new Schema(
    {
        address: {
            country_code: String,
        },
        email_address: String,
        name: {
            given_name: String,
            surname: String
        },
        payer_id: String,
    }
)

const transactionSchema = new Schema(
    {
        create_time: String,
        update_time: String,
        purchase_id: String, // Paypal PurchaseId
        intent: String,
        links: [{
            type: linkSchema
        }],
        payer: {
            type: payerSchema
        },


        purchasedBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
            // required: true
        },

        purchase_units: [{
            type: Schema.Types.ObjectId,
            ref: "purchasedItem",
        }],
 
        // documentation_url: String,
        // video_url: String,
        status: String,
    },
    {
        timestamps: true,
        id: true
    },
);



module.exports = () => {
    try {
        return mongoose.model('transaction');
    } catch (e) {
        return mongoose.model('transaction', transactionSchema);
    }

};
