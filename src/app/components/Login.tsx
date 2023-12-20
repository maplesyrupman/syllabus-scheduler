"use client"
import { useSession, signIn, signOut } from "next-auth/react" 

export default function Login() {
    const {data: session} = useSession()

    if (session) {
        return (
            <> 
                <button onClick={() => signOut()} type='button' className="" >Log Out</button>
            </>
        )
    } else {
        return (
            <> 
                <button onClick={() => signIn()} type='button' className="" >Log In with Google</button>
            </>
        )
    }
}