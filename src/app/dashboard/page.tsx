import { Suspense } from "react"

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}
