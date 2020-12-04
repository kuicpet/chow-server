const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
//const resolvers = require("./graphql/resolvers");
const { MONGOdb } = require("./config");


const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    //resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(`${MONGOdb}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected Successfully")
        return server.listen({ port: PORT })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.log(err)
    });