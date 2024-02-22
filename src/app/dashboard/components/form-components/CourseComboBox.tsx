'use client'

import { useState } from 'react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox, Label } from '@headlessui/react'
import { Course } from '@/types/data'

interface Props {
    items: Course[],
    addCourse: (course: Course) => void
}

export default function CourseComboBox({ items, addCourse }: Props) {
    const [query, setQuery] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const filteredItems =
        query === ''
            ? items
            : items.filter((item: any) => item.courseCode.toLowerCase().includes(query.toLowerCase()))

    return (
        <Combobox as="div" value={selectedItem} onChange={setSelectedItem}>
            <Label className="block text-sm font-medium leading-6 text-gray-900">Course Code</Label>
            <div className="relative mt-2">
                <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredItems.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredItems.map((item) => (
                            <Combobox.Option
                                key={item._id}
                                value={item}
                                className={'relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900'}
                                onClick={() => {
                                    addCourse(item)
                                    setQuery('')
                                }}
                            >
                                <span className={'block truncate'}>{item.courseCode}</span>
                            </Combobox.Option>
                        )
                        )}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}