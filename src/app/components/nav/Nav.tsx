"use client"
import Image from "next/image"
import Login from "./Login"
import {useSession} from 'next-auth/react'
import UserMenu from "./UserMenu"

export default function Nav() {
    const {data: session} = useSession()
    console.log(session) 
    return (
        <nav className="flex justify-between p-4 bg-primary">
            <Image src='/logo.png' width="108" height="48" alt='logo' />
            {session?.user ? <UserMenu /> : <Login />}
        </nav>
    )
}