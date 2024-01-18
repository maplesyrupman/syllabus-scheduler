import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./typeDefs";
import resolvers from './resolvers'
import { getServerSession } from "next-auth";
import {authConfig} from '../auth/[...nextauth]/route'

interface Context {
    user: {
        _id: string
        email: string
        name: string
        scheduleID: string
        schoolID: string
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => {
        const session = await getServerSession(authConfig)
        return {user:session?.user}
    },
});

export { handler as GET, handler as POST } 