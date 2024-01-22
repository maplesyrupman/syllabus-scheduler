"use client"

import ComboBox from "../components/form-components/ComboBox"

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { COURSES } from "@/lib/queries"

export default function AddCourse() {
    //get courses for student's school
    const { data, loading, error } = useQuery(COURSES)

    if (data) console.log(data)
    if (error) console.log(error)

    if (loading) {
        return <div>Loading...</div>
    } else if (data.courses.length) {
        return (
            <div>
                <h1>Add Course</h1>
                <div>
                    
                    <ComboBox items={data.courses} symbolString="courseCode"/>
                </div>
            </div>
        )
    }




}