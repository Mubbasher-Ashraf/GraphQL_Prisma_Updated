const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }];  
var idCount = links.length;

const resolvers = {
    Query: {
        info: () => 'This is API of a Hackernews Clone',
        feed: () => links,
        link: (parent, args) => {
            let data = links.filter((val) => val.id === args.id);
            return data[0];
        }
    },

    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link);
            return link;
        },
        
        updateLink: (parent, args) => {
            var data;
            links.map((val) => {
                if(val.id === args.id) {
                    val.url = args.url;
                    val.description = args.description;
                    data = val;
                }
            })
            return data;
        },

        deleteLink: (parent, args) => {
            var data;
            Object.values(links).forEach((val) => {
                if(val.id === args.id) {
                    data = val;
                    links.splice(links.indexOf(val), 1);
                }
            })
            return data;
        },
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log('Server Running on http://localhost:4000'));

