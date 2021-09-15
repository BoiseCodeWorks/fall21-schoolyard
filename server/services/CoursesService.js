import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class CoursesService {
  async createAssignment(courseId, userId, assignmentData) {
    const course = await dbContext.Courses.findById(courseId)
    if (!course) {
      throw new BadRequest('Invalid Course Id')
    }

    if (userId !== course.teacherId.toString()) {
      throw new Forbidden('You are not the teacher for this course')
    }

    const assignment = await dbContext.Assignments.create(assignmentData)
    return assignment
  }

  async getAssignments(courseId) {
    const assignments = await dbContext.Assignments.find({ courseId })
    return assignments
  }

  async createCourse(courseData) {
    const course = await dbContext.Courses.create(courseData)
    await course.populate('teacher', 'name picture')
    return course
  }

  async getCourses(query) {
    const courses = await dbContext.Courses.find(query).populate('teacher', 'name picture')

    if (
      (!courses || !courses.length) &&
      Object.keys(query).length) {
      throw new BadRequest('No matching courses')
    }

    return courses
  }
}

export const coursesService = new CoursesService()
