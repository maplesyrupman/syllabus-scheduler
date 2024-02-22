import { getSingleCourse } from "./handlers/course-handlers";
import connectToDatabase from "@/lib/db";
import { ObjectId } from "mongodb";
import { getCurrentSemester } from '@/lib/utilities.ts'

const resolvers = {
    Query: {
        hello: (_, args, context, info) => {
            console.log('context.user:', context.user)
            return "Hello world!"
        },
        courseByCode: async (parent, args, context, info) => {
            const result = await getSingleCourse(args.courseCode);
            return result;
        },
        schedule: async (parent, args, context, info) => {
            const db = await connectToDatabase()
            const scheduleID = context.user.scheduleID
            const Schedule = db.collection('schedule')
            const schedule = await Schedule.findOne({ _id: new ObjectId(scheduleID) })
            return schedule
        },
        courses: async (parent, args, context, info) => {
            try {
                console.log('in aggregate')
                const db = await connectToDatabase()
                const schoolID = context.user.schoolID
                console.log(schoolID)

                const CoursesCol = db.collection('courses')
                const courses = await CoursesCol.aggregate([
                    { $match: { schoolID: new ObjectId(schoolID) } }
                ]).toArray()

                console.log('courses:', courses)

                return courses
            } catch (error) {
                console.log(error)
                return error
            }
        }
    },
    Mutation: {
        addCourses: async (parent, args, context, info) => {
            const db = await connectToDatabase()

            console.log(args)

            const scheduleID = context.user.scheduleID
            const Schedule = db.collection('schedule')
            const schedule = await Schedule.findOne({ _id: new ObjectId(scheduleID) })
            return schedule
        }
    }
};

export default resolvers 