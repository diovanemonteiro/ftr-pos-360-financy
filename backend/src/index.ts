import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `
    type Query {
        hello: String
    }
`

async function bootstrap() {
    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            Query: {
                hello: () => 'Hello World!',
            },
        },
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    })

    console.log(`🚀  Servidor iniciado em: ${url}`)
}

bootstrap()