"use client"
import { useSession, signIn, signOut } from "next-auth/react" 

export default function Login() {

    return (
        <button onClick={() => signIn()} type='button' className="flex items-end gap-2" >
            <p>Sign in/up</p>
            <div className="w-[50px] h-[50px] rounded-full bg-gray-300 flex justify-center align">
                <div className="flex align-center justify-center">?</div>
            </div>
        </button>
    )
}