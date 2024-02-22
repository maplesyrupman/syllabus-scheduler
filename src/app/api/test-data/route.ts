import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
//@ts-ignore
import pdfcrowd from 'pdfcrowd'
import path from "path";

export async function GET(req: NextRequest) {
    try {
        const db = await connectToDatabase()
        console.log('inroute')

        const usersCollection = db.collection('users')
        
        // const user = await usersCollection.findOne({email: "will.sj.weiland@gmail.com"})
        // if (user) {
        //     console.log(user)
        // }
        // console.log('env var:', process.env.NEXTAUTH_SECRET)
        return NextResponse.json({message: 'success'})
    } catch (err) {
        console.log(err)
        return NextResponse.json({err}, {status: 500})
    }
    //     const inputFile = path.join(process.cwd(), 'public/syllabi/eng-f23.pdf');
    //     const outputFile = path.join(process.cwd(), 'public/text-syllabi/eng-f23.txt');


    //     const client = new pdfcrowd.PdfToTextClient(process.env.PDFCROWD_USERNAME, process.env.PDFCROWD_API_KEY);

    //     client.convertFileToFile(inputFile, outputFile, (err: any, filePath: any) => {
    //         if (err) {
    //             console.error("Pdfcrowd Error: " + err);
    //             throw new Error(`${err}`)
    //             return;
    //         }
    //         console.log("Success: the file was created at " + filePath);
    //     });

    //     return NextResponse.json({ message: 'File created successfully!' })
    // } catch (err) {
    //     return NextResponse.json({ error: err }, { status: 500 })
    // }
}