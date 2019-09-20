const graphQlUserSchema = require('./user');
const graphQlPurchaseSchema = require('./purchase')
const graphQlCartSchema = require('./cart')
const graphQlTestingSchema = require('./testing');
const graphQlDesignSchema = require('./design');
const graphQlLikeSchema = require('./like');
const graphQlHowToDocSchema = require('./how-to-doc');
const schema = require('./schema');

const schemaArray = [
    schema,
    graphQlUserSchema,
    graphQlPurchaseSchema,
    graphQlCartSchema,
    graphQlTestingSchema,
    graphQlHowToDocSchema,
    graphQlDesignSchema,
    graphQlLikeSchema
];

module.exports = schemaArray;