"use client"
import ViewSelector from "./components/ViewSelector"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useSession } from "next-auth/react"
import {HELLO, SCHEDULE} from '@/lib/queries'


export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    const {data, loading, error} = useQuery(HELLO)
    
    if (data) console.log(data)
    else if (loading) console.log(loading)
    else if (error) console.log(error)

    return (
        <section>
            <ViewSelector />
            {children}
        </section>
    )
}