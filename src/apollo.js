const { ApolloServer, gql } = require('apollo-server');

// Dummy data
const clientes = [
  { id: 1, nome: 'João', telefone: '(11) 98765-4321' },
  { id: 2, nome: 'Maria', telefone: '(11) 97654-3210' },
];

// Definindo o schema usando a sintaxe SDL (Schema Definition Language) do Apollo
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

// Resolvers
const resolvers = {
  Query: {
    clientes: () => clientes,
  },
};

// Criação do servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Inicia o servidor
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
