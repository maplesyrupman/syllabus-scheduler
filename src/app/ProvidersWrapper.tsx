"use client"
import { SessionProvider } from "next-auth/react";
import { ApolloWrapper } from "./apolloWrapper";

export default function ProvidersWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <ApolloWrapper>
                {children}
            </ApolloWrapper>
        </SessionProvider>
    )
}