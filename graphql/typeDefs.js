const { gql } = require("apollo-server");

module.exports = gql`
    type Query {
        dummy: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Mutation {
        register(RegisterInput: RegisterInput): User!
        login(email: String!, password: String!): User!
    }
`