const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Definindo o schema
const typeDefs = gql`
  type Cliente {
    id: Int!
    nome: String!
    telefone: String!
  }

  type Query {
    clientes: [Cliente]
  }
`;

// Dummy data
const clientes = [
  { id: 1, nome: 'João', telefone: '(11) 98765-4321' },
  // Adicione mais clientes conforme necessário
];

// Resolvers
const resolvers = {
  Query: {
    clientes: () => clientes,
  },
};

// Inicializa o Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Inicializa o Express
const app = express();

// Inicia o Apollo Server
(async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Inicia o servidor Express
  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
})();
