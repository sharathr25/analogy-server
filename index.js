const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const {createServer} = require('http');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const server = new ApolloServer({
    typeDefs : gql`
        type Query {
            ping:String!
        }
    `,
    resolvers : {
        Query : { 
            ping: (_,args,__) => {
                console.log(args);
                return "ping"
            }   
        }
    }
});

server.applyMiddleware({app});

const ws = createServer(app);

ws.listen({port:process.env.PORT || 4000}, () => {
    console.log(`Apollo Server is now running on ${process.env.PORT || 4000}`);
});
