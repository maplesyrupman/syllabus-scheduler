'use client'
import { useContext } from "react"
import { AuthContext } from "../context"

export default function WeeklyOverview() {
    const auth = useContext(AuthContext)
    console.log('auth', auth)


    return (
        <div>Weekly Overview</div>
    )
}