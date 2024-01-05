import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex justify-between px-4 py-2 text-xs bg-gray-300">
            <p>Syllabus Scheduler {(new Date()).getFullYear()}</p>
            <Link href='/privacy-policy' className="underline">Privacy Policy</Link>
        </footer>
    )
}