const { gql } = require('apollo-server-lambda')

const schema = `

type Product {
  _id: ID
  type: String
  name: String
  description: [descriptionBlocks]
  shortDescription: String
  featuredImage: String
  createdBy: User
  priceAndFiles: [PriceAndFiles]
  price: Int
  categories: [String]
  demo_url: String
  documentation_url: String
  video_url: String
  status: Status
  createdAt: String
  updatedAt: String
  snippets: [Snippet]
  tags: [Tag]
  comments: [Comment]
  support: Support
  likeCount: Int

  purchasedBy: [PurchasedBy]
}

type PurchasedBy {
  name: String
  _id: ID
  avatar: String
  createdAt: String
}

input ProductInput {
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

type Support {
  time: Int
  description: [descriptionBlocks]
}

input SupportInput {
  time: Int
  description: [InputdescriptionBlock]
}

type Comment {
  parents: [Comment]
  children: [Comment]
  _id: ID
  text: [descriptionBlocks]
  referenceId: ID
  type: String
  parentId: ID
  createdBy: User
  createdAt: String
}

input CommentInput {
  parents: [ID]
  children: [ID]
  discussion_id: String
  parentId: ID
  referenceId: ID
  type: String
  _id: ID
  text: [InputdescriptionBlock]
  createdBy: ID
  createdAt: String
}

type Tag {
  name: String
  _id: ID
}

input TagInput {
  name: String
  _id: ID
}

type Requirement {
  _id: ID
  name: String
  type: String
  description: [descriptionBlocks]
  shortDescription: String
  featuredImage: String
  createdBy: User
  price: Int
  categories: [String]
  demo_url: String
  status: Status
  createdAt: String
  updatedAt: String
  tags: [Tag]
  support: Support
  likeCount: Int
}

input RequirementInput {
  _id: ID
  name: String
  type: String
  description: [InputdescriptionBlock]
  shortDescription: String
  featuredImage: String
  createdBy: ID
  price: Int
  categories: [String]
  demo_url: String
  status: Status
  tags: [TagInput]
  support: SupportInput
}

type Interview {
  _id: ID
  name: String
  type: String
  description: [descriptionBlocks]
  shortDescription: String
  featuredImage: String
  createdBy: User
  price: Int
  categories: [String]
  demo_url: String
  status: Status
  createdAt: String
  updatedAt: String
  tags: [Tag]
  support: Support
  likeCount: Int
}

input InterviewInput {
  _id: ID
  name: String
  type: String
  description: [InputdescriptionBlock]
  shortDescription: String
  featuredImage: String
  createdBy: ID
  price: Int
  categories: [String]
  demo_url: String
  status: Status
  tags: [TagInput]
  support: SupportInput
}

type Snippet {
  language: String
  r: Int
  value: String
}

input SnippetInput {
  language: String
  r: Int
  value: String
}

type PriceAndFiles {
  fileName: String
  file: String
  price: Int
}

input PriceAndFilesInput {
  fileName: String
  file: String
  price: Int
}


enum Status {
  Created
  Drafted
  Published
  Unpublished
  Submitted
  Approved
  Rejected
  Archieved
  Deleted
}

enum Roles {
  User
  Admin
}

type HelpQuery {
  name: String
  type: String
  description: [descriptionBlocks]
  price: Int
  _id: ID
  createdBy: User
  createdAt: String
  updatedAt: String
  status: Status
  categories: [String]
  demo_url: String
  documentation_url: String
  video_url: String
  snippets: [Snippet]
  shortDescription: String
  tags: [Tag]
  support: Support
  likeCount: Int
}

input HelpQueryInput {
  name: String
  type: String
  description: [InputdescriptionBlock]
  price: Int
  _id: ID
  createdBy: String
  createdAt: String
  updatedAt: String
  status: Status
  categories: [String]
  demo_url: String
  documentation_url: String
  video_url: String
  snippets: [SnippetInput]
  shortDescription: String
  tags: [TagInput]
  support: SupportInput
}


input InputdescriptionBlock {
  type: String
  data: InputdescriptionBlocks
}

input InputdescriptionBlocks {
  text: String
  level: Int
  code: String
  language: String

  caption: String
  file: URLInput
  stretched: Boolean
  withBackground: Boolean
  withBorder: Boolean

  style: String
  items: [String]

  alignment: String

  content: [[String]]

  title: String
  message: String

  service : String
  source : String
  embed : String
  width : Int
  height : Int
}






union descriptionBlocks = CodeBlock | ImageBlock | ParagraphBlock | HeaderBlock | ListBlock | QuoteBlock | TableBlock | WarningBlock | EmbedBlock

type CodeBlock {
  type: String
  data: Code
}

type Code {
  code: String
  language: String
}

type ImageBlock {
  type: String
  data: Image
}

type Image {
  caption: String
  file: URL
  stretched: Boolean
  withBackground: Boolean
  withBorder: Boolean
}

type ListBlock {
  type: String
  data: List
}

type List {
  style: String
  items: [String]
}

type ParagraphBlock {
  type: String
  data: Paragraph
}

type Paragraph {
  text: String
}


type HeaderBlock {
  type: String
  data: Header
}

type Header {
  text: String
  level: Int
}

type QuoteBlock {
  type: String
  data: Quote
}

type Quote {
  text: String
  caption: String
  alignment: String
}

type TableBlock {
  type: String
  data: Table
}

type Table {
  content: [[String]]
}

type WarningBlock {
  type: String
  data: Warning
}

type Warning {
  title: String
  message: String
}

type EmbedBlock {
  type: String
  data: Embed
}

type Embed {
  service : String
  source : String
  embed : String
  width : Int
  height : Int
  caption : String
}





type URL {
  url: String
}

input URLInput {
  url: String
}



type Query {
  hello: String

  getAllPosts: [Product]

  getAllProducts: [Product]
  getProductsByUserId(userId: String, status: String): [Product]
  getProductById(productId: String): Product
  getListOfUsersWhoPurchased(productId: String): [PurchasedBy]

  getComments(commentId: String): Comment
  getCommentsByReferenceId(referenceId: String): [Comment]
  deleteComment(commentId: String): String

  getAllHelpRequests: [HelpQuery]
  getHelpRequestsByUserId(userId: String, status: String): [HelpQuery]
  getHelpRequestById(helpRequestId: String): HelpQuery


  getAllInterviews: [Interview]
  getInterviewsByUserId(userId: String, status: String): [Interview]
  getInterviewById(interviewId: String): Interview


  getAllRequirements: [Requirement]
  getRequirementsByUserId(userId: String, status: String): [Requirement]
  getRequirementById(requirementId: String): Requirement

  searchCategories(keyWord: String): [Tag]
}

type Mutation {

  addProduct(product: ProductInput): Product
  updateProduct(product: ProductInput): Product
  deleteProduct(productId: String): Boolean

  addComment(comment: CommentInput): Comment
  updateComment(commentId: String, text: [InputdescriptionBlock]): Comment

  addQuery(helpQuery: HelpQueryInput): HelpQuery
  updateHelpRequest(helpRequest: HelpQueryInput): HelpQuery
  deleteHelpRequest(helpRequestId: String): Boolean

  addInterview(interview: InterviewInput): Interview
  updateInterview(interview: InterviewInput): Interview
  deleteInterview(interviewId: String): Boolean

  addRequirement(requirement: RequirementInput): Requirement
  updateRequirement(requirement: RequirementInput): Requirement
  deleteRequirement(requirementId: String): Boolean
}
`

module.exports = gql(schema)
