const express = require('express');
const { ApolloServer, gql } = require('apollo-server');

// Dummy data
const clientes = [
  { id: 1, nome: 'João', telefone: '(11) 98765-4321' },
  { id: 2, nome: 'Maria', telefone: '(11) 97654-3210' },
  // Adicione mais clientes conforme necessário
];

// Schema definition using gql
const typeDefs = gql`
  type Cliente {
    id: Int
    nome: String
    telefone: String
  }

  type Query {
    todosClientes: [Cliente]
    buscaPorNome(nome: String!): [Cliente]
  }
`;

// Resolvers
const resolvers = {
  Query: {
    todosClientes: () => clientes,
    buscaPorNome: (_, { nome }) => { // obrigatório passar 2 parametros (_, { nome }) onde o "_" represeta ignorar para o parametro inicial que é o root
      const regex = new RegExp(nome, 'i'); // Case insensitive pattern matching
      return clientes.filter(cliente => cliente.nome.match(regex));
    },
  },
};

// Criação do servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Inicia o servidor
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

