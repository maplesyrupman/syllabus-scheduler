"use client"
import ViewSelector from "./components/ViewSelector"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { SCHEDULE } from '@/lib/queries'
import { AuthContext } from "./context"


export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    const { data, loading, error } = useQuery(SCHEDULE)

    if (loading) {
        return <div>Loading...</div>
    }
    else if (data) {
        return (
            <section>
                <AuthContext.Provider value={data}>
                    <ViewSelector />
                    {children}
                </AuthContext.Provider>
            </section>
        )
    } else {
        return <div>There was an error Fetching your data!</div>
    }
}