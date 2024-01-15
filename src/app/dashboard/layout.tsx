import ViewSelector from "./components/ViewSelector"

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {


    return (
        <section>
            <ViewSelector />
            {children}
        </section>
    )
}