
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{ clientes { id nome telefone } }" }' http://localhost:4000/graphql