import { getSingleCourse } from "./handlers/course-handlers";

const resolvers = {
    Query: {
        hello: () => "Hello world!",
        courseByCode: async (parent, args, context, info) => {
            console.log('Args:', args); // Log the arguments
            const result = await getSingleCourse(args.courseCode);
            console.log('Result:', result); // Log the result
            return result;
        }
    },
};

export default resolvers 