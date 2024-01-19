"use client"
import ViewSelector from "./components/ViewSelector"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { SCHEDULE } from '@/lib/queries'
import { AuthContext } from "./context"


export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    const { data, loading, error } = useQuery(SCHEDULE)

    if (data) console.log(data)
    else if (loading) console.log(loading)
    else if (error) console.log(error)

    return (
        <section>
            <AuthContext.Provider value={{data,loading,error}}>
                <ViewSelector />
                {children}
            </AuthContext.Provider>
        </section>
    )
}