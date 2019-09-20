const { gql } = require('apollo-server-lambda');

const graphQlDesignSchema = `
    type Design {
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
    
    input DesignInput {
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
        getAllDesigns: [Design]
        getDesignsByUserId(userId: String, , status: String): [Design]
        getDesignById(designId: String): Design
    }
    extend type Mutation {
        addDesign(design: DesignInput): Design
        updateDesign(design: DesignInput): Design
        deleteDesign(designId: String): Boolean        
    }
`

module.exports = gql(graphQlDesignSchema);