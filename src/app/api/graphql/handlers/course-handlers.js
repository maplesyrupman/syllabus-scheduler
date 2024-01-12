import connectToDatabase from '@/lib/db'

export async function getSingleCourse(courseCode) {
    const db = await connectToDatabase()

    const coursesCollection = db.collection('courses')
    const course = await coursesCollection.findOne({courseCode})

    return course
}

