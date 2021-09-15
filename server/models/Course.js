import mongoose from 'mongoose'

export const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  description: { type: String },
  code: { type: Number, required: true, min: 100, max: 999 },
  credits: { type: Number, default: 1, min: 0, max: 6 },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

CourseSchema.virtual('teacher', {
  localField: 'teacherId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
