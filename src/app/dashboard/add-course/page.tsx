"use client"

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { COURSES } from "@/lib/queries"

export default function AddCourse() {
    //get courses for student's school
    const {data, loading, error} = useQuery(COURSES)

    if (data) console.log(data)
    if (error) console.log(error) 
    

    return (
        <div>Add course</div>
    )
}