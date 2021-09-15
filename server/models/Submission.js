import mongoose from 'mongoose'

export const SubmissionSchema = new mongoose.Schema({
  studentNotes: { type: String, trim: true, maxlength: 1000 },
  gradingNotes: { type: String, trim: true },
  url: { type: String, trim: true, required: true },
  grade: { type: Number, default: 0, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Account' },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Assignment' }
}, { timestamps: true, toJSON: { virtuals: true } })

// REVIEW multifield constraint
SubmissionSchema.index({ studentId: 1, assignmentId: 1 }, { unique: true })

SubmissionSchema.virtual('course', {
  localField: 'courseId',
  foreignField: '_id',
  justOne: true,
  ref: 'Course'
})
SubmissionSchema.virtual('student', {
  localField: 'studentId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
SubmissionSchema.virtual('assignment', {
  localField: 'assignmentId',
  foreignField: '_id',
  justOne: true,
  ref: 'Assignment'
})
