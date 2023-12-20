import { NextResponse } from "next/server";
import db from '@/utils/firebaseConfig'
import {collection, getDocs} from 'firebase/firestore'

export async function GET() {
    try {

        const querySnapshot = await getDocs(collection(db, "lecture"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });

        return NextResponse.json({ querySnapshot })
    } catch (err) {
        return NextResponse.json({ err }, { status: 500 })
    }
}