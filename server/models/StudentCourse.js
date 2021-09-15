import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
export const StudentCourseSchema = new Schema({
  studentId: { type: ObjectId, required: true, ref: 'Account' },
  courseId: { type: ObjectId, required: true, ref: 'Course' }
}, {
  timestamps: true,
  id: true,
  toJSON: { virtuals: true }
})

StudentCourseSchema.virtual('student', {
  localField: 'studentId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

StudentCourseSchema.virtual('course', {
  localField: 'courseId',
  foreignField: '_id',
  justOne: true,
  ref: 'Course'
})
