
const { gql } = require('apollo-server-lambda');

const graphQlCartSchema = `
    
    type CartItem {
        referenceId: Product
        type: String
        user: User
    }

    type CartItemInput {
        referenceId: ID
        type: String
        user: ID
    }

    extend type Query {
        getCartItemsList(userId: String): [CartItem]
    }


    extend type Mutation {
        addToCart(userId: String, referenceId: String): [CartItem]
        removeItemFromCart(userId: String, referenceId: String): [CartItem]
    }
`

module.exports = gql(graphQlCartSchema);

