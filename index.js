const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma/generated/prisma-client');

const Query = require('./src/resolvers/Query');
const Mutation = require('./src/resolvers/Mutation');
const User = require('./src/resolvers/User');
const Link = require('./src/resolvers/Link');
const Subscription = require('./src/resolvers/Subscription');
const Vote = require('./src/resolvers/Vote');

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote,
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: (request) => { 
        return {
            ...request,
            prisma,
        } 
    }
});

server.start(() => console.log('Server Running on http://localhost:4000'));

