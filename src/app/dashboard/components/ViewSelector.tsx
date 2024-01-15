"use client"
import Link from "next/link"

import { usePathname } from 'next/navigation'

//@ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Views() {

    const pathName = usePathname()

    const woPath = '/dashboard/weekly-overview'
    const cPath = '/dashboard/courses'
    const views = [
        { name: 'Weekly Overview', href: woPath, current: woPath === pathName },
        { name: 'Courses', href: cPath, current: cPath === pathName },
    ]

    console.log(pathName)
    return (
        <div>
            <div className="sm:block">
                <nav className="flex space-x-4" aria-label="views">
                    {views.map((view) => (
                        <Link
                            key={view.name}
                            href={view.href}
                            className={classNames(
                                view.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                                'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={view.current ? 'page' : undefined}
                        >
                            {view.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}