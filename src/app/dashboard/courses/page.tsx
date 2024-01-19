'use client'
import { useContext } from "react"
import { AuthContext } from "../context"
import NoCourses from "../components/NoCourses"

export default function Courses() {
    const auth = useContext(AuthContext)

    console.log(auth)
    if (auth.schedule.courses.length === 0 && auth.schedule.shifts.length === 0) {
        return <NoCourses />
    } else {
        return (
            <div>Weekly Overview</div>
        )
    }
}