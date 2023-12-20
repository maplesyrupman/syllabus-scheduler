"use client"
import { useSession } from 'next-auth/react'
import axios from 'axios'

export default function CreateEvent() {
    const { data: session } = useSession()

    async function createEvent() {
        if (!session) {
            alert('must be logged in!')
            return
        }

        console.log(session)

        axios.post('http://localhost:3000/api/generate-schedule', {
                "title": "INDS Presentation!", 
                "description": "final thing of this semester!",
                "start": {
                    "dateTime": "2023-12-14T13:00:00",
                    "timeZone": "America/New_York"
                },
                "end": {
                    "dateTime": "2023-12-14T16:00:00",
                    "timeZone": "America/New_York"
                }
        }).then(console.log)
        .catch(console.error)

        // console.log(`response: ${response}`)
    }



    return (
        <button onClick={() => createEvent()}>
            Create an event!
        </button>
    )
}