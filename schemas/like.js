const { gql } = require('apollo-server-lambda');

const graphQlLikeSchema = `

    type Like {
        _id: ID
        referenceId: String
        userId: String
        type: String
    }

    type LikesCount {
        liked: Boolean,
        likeCount: Int
    }
    
    input LikeInput {
        _id: ID
        referenceId: String
        type: String
        userId: String
    }

    extend type Query {
        checkIfUserLikedAndLikeCount(userId: String, referenceId: String, type: String): LikesCount
    }
    
    extend type Mutation {
        like(like: LikeInput, liked: Boolean): LikesCount       
    }
`

module.exports = gql(graphQlLikeSchema);