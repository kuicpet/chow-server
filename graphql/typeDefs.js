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
        email: String!
        username: String!
        password: String!
        confirmPassword: String!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
    }
`