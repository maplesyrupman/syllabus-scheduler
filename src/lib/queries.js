import gql from "graphql-tag";

export const SCHEDULE = gql`
query schedule {
  schedule {
    _id
    courses {
      _id
      courseCode
      title
      dayTimes
      lectures {
        date
        description
        assignedReadings
      }
      assessments {
        date
        time
        description
        gradeWorth
      }
    }
    shifts {
      start
      end
      description
    }
  }
}
`

export const COURSES = gql`
query courses {
  courses {
    _id
    title 
    courseCode 
  }
}
`