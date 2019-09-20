
const { gql } = require('apollo-server-lambda');

const graphQlUserSchema = `
type User {
    _id: ID!
    name: String
    email: String
    sub: String
    email_verified: Boolean
    programming_languages: [String]
    github_url: String
    linkedin_url: String
    stackoverflow_url: String
    portfolio_links: [String]
    location: String
    avatar: String
    roles: [String]
    createdAt: String
    currentJobDetails: CurrentJobDetails
    likeCount: Int
  }
  
  input UserInput {
    _id: ID
    name: String
    email: String
    sub: String
    email_verified: Boolean
    programming_languages: [String]
    github_url: String
    linkedin_url: String
    stackoverflow_url: String
    portfolio_links: [String]
    location: String
    avatar: String
    roles: [String]
    createdAt: String
    currentJobDetails: CurrentJobDetailsInput
  }

  input CurrentJobDetailsInput {
    jobProfile: String
    companyName: String
    companyLocation: String
  }
  
  type CurrentJobDetails {
    jobProfile: String
    companyName: String
    companyLocation: String
  }

  type UserAndBugFixCount {
    _id: ID,
    name: String,
    productCount: Int
  }

  extend type Query {
    getUsers(_page: Int _limit: Int): [User!]!
    getUsersAndBugFixesCount: [UserAndBugFixCount]
    getUserById(userId: String): User
  }

  extend type Mutation {
    createUser(user: UserInput!): User
    updateUser(user: UserInput): User
    authorize(applicationId: String): User
  }
`

module.exports = gql(graphQlUserSchema);

