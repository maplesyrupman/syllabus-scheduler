"use client"

import CourseComboBox from "../components/form-components/CourseComboBox"
import { Button } from "@/app/components/button"

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { COURSES } from "@/lib/queries"
import { useState } from "react"
import { Course } from '@/types/data'
import {addToArraySet} from '@/lib/utilities'

export default function AddCourse() {
    //get courses for student's school
    const { data, loading, error } = useQuery(COURSES)
    const [courses, setCourses] = useState<Course[]>([])

    function addCourse(course: Course) {
        const coursesArray = Array.from(courses)
        addToArraySet(course, coursesArray)
        setCourses(coursesArray)
    }

    function removeCourse(courseToRemove: Course) {
        setCourses([...courses].filter(course => course !== courseToRemove))
    }

    function handleAddCourses() {
        const courseIds = courses.map(course => course._id)
        console.log(courseIds)
    }

    if (data) console.log(data)
    if (error) console.log(error)

    if (loading) {
        return <div>Loading...</div>
    } else if (data.courses.length) {
        return (
            <div>
                <h1>Add Courses</h1>
                <div>

                    <CourseComboBox addCourse={addCourse} items={data.courses} />

                    <div>
                        {courses.map(course => (
                            <div
                                className="py-2 px-3 m-3 flex gap-2 items-center border border-gray-700"
                                key={course._id}
                            >
                                <Button onClick={() => removeCourse(course)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </Button>
                                <span className="text-lg">{course.title}</span>
                                <span className="text-sm text-gray-700">{course.courseCode}</span>
                            </div>
                        ))}
                    </div>

                    <Button onClick={handleAddCourses} >
                        <span>Add Courses</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                    </Button>
                </div>
            </div>
        )
    }
}