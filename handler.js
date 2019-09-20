const {ApolloServer} = require('apollo-server-lambda');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const connectToMongoDB = require('./helpers/db');
const auth = require('./helpers/auth');

global.basePath = __dirname + '/';

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: async ({event, context}) => ({
    callbackWaitsForEmptyEventLoop: false,
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    decodedToken: event.headers && event.headers.Authorization ?  await auth.auth(event.headers) : null,
    db: await connectToMongoDB() 
  }),
  introspection: true,
  playground: true,
});

module.exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
}, );
