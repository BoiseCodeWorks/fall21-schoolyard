import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CourseSchema } from '../models/Course.js'
import { CourseAssignmentSchema } from '../models/CourseAssignment.js'
import { Value as ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema)
  Account = mongoose.model('Account', AccountSchema)
  Courses = mongoose.model('Course', CourseSchema)
  Assignments = mongoose.model('Assignment', CourseAssignmentSchema)
}

export const dbContext = new DbContext()
