const mongoose = require('mongoose');
const { Schema } = mongoose;

const currentJobDetails = new Schema(
    {
        jobProfile: String,
        companyName: String,
        companyLocation: String
    }
);


const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        name: String,
        sub: String,
        email: String,
        email_verified: Boolean,
        phone: String,
        programming_languages: { type: Array, default: [] },
        github_url: String,
        linkedin_url: String,
        stackoverflow_url: String,
        portfolio_links: Array,
        location: String,
        currentJobDetails: currentJobDetails,
        avatar: String,
        roles: {
            type: [String],
            enum: ['Developer', 'Admin', 'User'],
            default: ['User'],

        }
    },
    {
        timestamps: true,
        id: true
    },
);



module.exports = () => {
    try {
        return mongoose.model('user');
    } catch (e) {
        return mongoose.model('user', userSchema);
    }

};
