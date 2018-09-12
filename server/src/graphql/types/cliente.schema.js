const clienteTypes = `

    type Cliente {
        id: ID!
        name: String!
        email: String!
        cidadeId: String!        
        fazenda: String!
        endereco: String!
        telefone: String!
        celular: String  
        obs: String
    }

    input ClienteInput {
        name: String!
        email: String!
        cidadeId: String!        
        fazenda: String!
        endereco: String!
        telefone: String!
        celular: String  
        obs: String
    }

`;

const clienteQueries = `
    clientes: [Cliente]
    cliente(id: ID!): Cliente!
    clientesByName(name: String!): [Cliente]
`;

const clienteMutations = `
    createCliente(input: ClienteInput!): Cliente
    updateCliente(id: ID!, input: ClienteInput!): Cliente
    deleteCliente(id: ID!): Boolean
`;

export { clienteTypes, clienteQueries, clienteMutations };
