import { NextRequest, NextResponse } from "next/server";
import db from '@/utils/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
//@ts-ignore
import pdfcrowd from 'pdfcrowd'
import path from "path";

export async function GET(req: NextRequest) {

    try {
        // const inputFile = path.join(__dirname, '../../../public/syllabi/eng-f23.pdf');
        // const outputFile = path.join(__dirname, '../../../public/text-syllabi/eng-f23.txt') 

        const inputFile = path.join(process.cwd(), 'public/syllabi/eng-f23.pdf');
        const outputFile = path.join(process.cwd(), 'public/text-syllabi/eng-f23.txt');


        const client = new pdfcrowd.PdfToTextClient(process.env.PDFCROWD_USERNAME, process.env.PDFCROWD_API_KEY);

        client.convertFileToFile(inputFile, outputFile, (err: any, filePath: any) => {
            if (err) {
                console.error("Pdfcrowd Error: " + err);
                throw new Error(`${err}`)
                return;
            }
            console.log("Success: the file was created at " + filePath);
        });

        return NextResponse.json({ message: 'File created successfully!' })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }

    // try {

    //     const querySnapshot = await getDocs(collection(db, "lecture"));
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //     });

    //     return NextResponse.json({ querySnapshot })
    // } catch (err) {
    //     return NextResponse.json({ err }, { status: 500 })
    // }
}