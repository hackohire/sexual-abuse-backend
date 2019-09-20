
const { gql } = require('apollo-server-lambda');

const graphQlHowtodocSchema = `
    

    type Howtodoc {
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

    input HowtodocInput {
        _id: ID
        name: String
        type: String
        description: [InputdescriptionBlock]
        shortDescription: String
        featuredImage: String
        createdBy: ID
        priceAndFiles: [PriceAndFilesInput]
        price: Int
        categories: [String]
        demo_url: String
        documentation_url: String
        video_url: String
        status: Status
        snippets: [SnippetInput]
        addedToCart: Boolean
        tags: [TagInput]
        comments: [CommentInput]
        support: SupportInput
    }

    extend type Query {
        getAllHowtodocs: [Howtodoc]
        getHowtodocsByUserId(userId: String, status: String): [Howtodoc]
        getHowtodocById(howtodocId: String): Howtodoc
    }


    extend type Mutation {
        addHowtodoc(howtodoc: HowtodocInput): Howtodoc
        updateHowtodoc(howtodoc: HowtodocInput): Howtodoc
        deleteHowtodoc(howtodocId: String): Boolean        
    }


`

module.exports = gql(graphQlHowtodocSchema);

