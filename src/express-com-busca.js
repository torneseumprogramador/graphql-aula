const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt } = require('graphql');

// Dummy data
const clientes = [
  { id: 1, nome: 'João', telefone: '(11) 98765-4321' },
  { id: 2, nome: 'Maria', telefone: '(11) 97654-3210' },
  // Adicione mais clientes conforme necessário
];

// Tipo Cliente
const ClienteType = new GraphQLObjectType({
  name: 'Cliente',
  fields: () => ({
    id: { type: GraphQLInt },
    nome: { type: GraphQLString },
    telefone: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    todosClientes: {
      type: new GraphQLList(ClienteType),
      resolve(parent, args) {
        return clientes;
      },
    },
    buscaPorNome: {
      type: new GraphQLList(ClienteType),
      args: {
        nome: { type: GraphQLString },
      },
      resolve(parent, args) {
        const regex = new RegExp(args.nome, 'i'); // Case insensitive pattern matching
        return clientes.filter(cliente => cliente.nome.match(regex));
      },
    },
  },
});

// Schema
const schema = new GraphQLSchema({
  query: RootQuery,
});

const app = express();

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true,  // Intyerface interativa no navegador
  })
);

app.listen(4000, () => {
  console.log('Server is running on port 4000..');
});
