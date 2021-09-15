import mongoose from 'mongoose'

export const CourseAssignmentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  description: { type: String },
  dueDate: { type: Date, required: true },
  totalPoints: { type: Number, default: 0, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' }
}, { timestamps: true, toJSON: { virtuals: true } })

CourseAssignmentSchema.virtual('course', {
  localField: 'courseId',
  foreignField: '_id',
  justOne: true,
  ref: 'Course'
})
