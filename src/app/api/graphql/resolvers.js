import { getSingleCourse } from "./handlers/course-handlers";
import connectToDatabase from "@/lib/db";
import { ObjectId } from "mongodb";

const resolvers = {
    Query: {
        hello: () => "Hello world!",
        courseByCode: async (parent, args, context, info) => {
            const result = await getSingleCourse(args.courseCode);
            return result;
        },
        schedule: async (parent, args, context, info) => {
            const db = await connectToDatabase()
            const scheduleId = null
            const Schedule = db.collection('schedule')
            const schedule = await Schedule.findOne({ _id: new ObjectId(scheduleId) })
            return schedule
        },
    },
};

export default resolvers 