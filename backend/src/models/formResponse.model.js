import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const formResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who submitted the form
    required: true
  },
  formType: {
    type: Number,
    required: true,
    min: 1,
    max: 9 // Assuming only 9 form types exist
  },
 responses: [
    {
      question: String,
      answer: {
        type: String,
        enum: ['yes', 'no']
      }
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
}, { timestamps: true });

formResponseSchema.plugin(mongooseAggregatePaginate)
export const FormResponse = mongoose.model('FormResponse', formResponseSchema);
