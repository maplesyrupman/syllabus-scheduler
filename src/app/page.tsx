"use client"
import Head from "next/head"
import CreateEvent from "./components/EventTest"
import {useSession} from 'next-auth/react'
import TestShowData from "./components/TestShowData"

export default function Home() {
  const {status} = useSession()
  console.log(status)

  return (
    <>
      <Head>
        <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com" />
        <title>Syllabus Scheduler</title>
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className='flex flex-col'>
          <h1>Syllabus Scheduler!</h1>

          <TestShowData /> 
        </div>
      </div>
    </>
  )
}
