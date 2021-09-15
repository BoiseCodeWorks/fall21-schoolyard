import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CourseSchema } from '../models/Course.js'
import { Value as ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema)
  Account = mongoose.model('Account', AccountSchema)
  Courses = mongoose.model('Course', CourseSchema)
}

export const dbContext = new DbContext()
