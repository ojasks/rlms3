import mongoose from "mongoose";
import { FORM_TYPES } from "../constants.js";

const formSchema = new mongoose.Schema({
  formType: {
    type: Number,
    required: true,
    enum: FORM_TYPES,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      id: { type: Number, required: true },
      text: { type: String, required: true },
      // Add any question-specific fields (e.g., category, weight)
    }
  ],
  version: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const Form = mongoose.model("Form", formSchema);