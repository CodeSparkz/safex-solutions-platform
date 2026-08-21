import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, lowercase: true, trim: true, maxlength: 200 },
  company: { type: String, trim: true, maxlength: 150 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true, trim: true, maxlength: 1500 },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
