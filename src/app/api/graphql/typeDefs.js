import gql from "graphql-tag";

const typeDefs = gql`

  type Lecture {
    date: String
    description: String
    assignedReadings: [String]
  }

  type Assessment { 
    date: String
    time: String 
    description: String 
    gradeWorth: String 
  }

  type RequiredMaterial {
    title: String 
    author: String 
    description: String 
  }

  type Course {
    _id: ID
    courseCode: String
    title: String
    semester: String
    dayTimes: String 
    lectures: [Lecture]
    assessments: [Assessment]
    requiredMaterials: [RequiredMaterial]
  }

  type Shift {
    start: String
    end: String 
    description: String 
  }

  type Schedule {
    _id: ID 
    courses: [Course]
    shifts: [Shift] 
  }


  type Query {
    hello: String
    courseByCode(courseCode: String!): Course 
    schedule(scheduleID: ID!): Schedule
    # calendar: Calendar 
  }

`

export default typeDefs 