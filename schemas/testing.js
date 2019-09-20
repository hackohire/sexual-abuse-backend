
const { gql } = require('apollo-server-lambda');

const graphQlHowToDocSchema = `

    type Testing {
        _id: ID
        name: String
        type: String
        description: [descriptionBlocks]
        featuredImage: String
        createdBy: User
        price: Int
        categories: [String]
        status: Status
        createdAt: String
        updatedAt: String
        snippets: [Snippet]
        tags: [Tag]
        comments: [Comment]
        support: Support
        likeCount: Int
    }
    
    input TestingInput {
        _id: ID
        name: String
        type: String
        description: [InputdescriptionBlock]
        shortDescription: String
        featuredImage: String
        createdBy: ID
        price: Int
        categories: [String]
        status: Status
        snippets: [SnippetInput]
        addedToCart: Boolean
        tags: [TagInput]
        comments: [CommentInput]
        support: SupportInput
    }
    

    extend type Query {
        getAllTestings: [Testing]
        getTestingsByUserId(userId: String, status: String): [Testing]
        getTestingById(testingId: String): Testing
    }


    extend type Mutation {
        addTesting(testing: TestingInput): Testing
        updateTesting(testing: TestingInput): Testing
        deleteTesting(testingId: String): Boolean        
    }
`

module.exports = gql(graphQlHowToDocSchema);

