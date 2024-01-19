'use client'
import { useContext } from "react"
import { AuthContext } from "../context"
import NothingScheduled from "../components/NothingScheduled"

export default function WeeklyOverview() {
    const auth = useContext(AuthContext)

    console.log(auth)
    if (auth.schedule.courses.length === 0 && auth.schedule.shifts.length === 0) {
        return <NothingScheduled />
    } else {
        return (
            <div>Weekly Overview</div>
        )
    }
}