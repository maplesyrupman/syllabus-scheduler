import { Suspense } from "react"
import DashboardLayout from "./layout"

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}
