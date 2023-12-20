"use client"
import axios from 'axios'
import { useState } from 'react'
import Spinner from './Spinner'

export default function TestShowData() {

    const [lectures, setLectures] = useState<any[]>([])
    const [lecturesLoading, setLecturesLoading] = useState(false)

    async function fetchTestData() {
        setLecturesLoading(true)
        try {
            const { data } = await axios.get('/api/test-data')
            setLectures(data)
            console.log(data)
        } catch (err) {
            console.log(err)
        } finally {
            setLecturesLoading(false)
        }
    }

    return (
        <div className='flex flex-col py-3'>
            <div>
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={fetchTestData}
                >
                    Fetch Test Data
                </button>
            </div>

            {/* <div>
                {
                    lectures ? 
                    lectures.map(lecture => <p>{lecture?.courseCode}</p>) :
                    lecturesLoading ? <Spinner /> :
                    <p>No lecture data </p>
                }
            </div> */}
        </div>
    )
}