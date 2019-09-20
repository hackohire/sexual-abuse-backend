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

const amountSchema = new Schema(
    {
        value: String,
        currency_code: String
    }
);

const payeeSchema = new Schema(
    {
        email_id: String,
        merchant_id: String
    }
);


const purchasedItemSchema = new Schema(
    {
        description: String,
        reference_id: {
            type: Schema.Types.ObjectId, // Bugfix Id
            ref: "product",
            required: true
        },
        purchasedBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        transactionId: {
            type: Schema.Types.ObjectId,
            ref: "transaction"
        },
        soft_descriptor: String,
        amount: {
            type: amountSchema
        },
        payee: {
            type: payeeSchema
        },
        shipping: Object,
        
        payments: {
            captures: []
        },

        status: String,
    },
    {
        timestamps: true,
        id: true
    },
);



module.exports = () => {
    try {
        return mongoose.model('purchasedItem');
    } catch (e) {
        return mongoose.model('purchasedItem', purchasedItemSchema);
    }

};
