import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, lowercase: true, trim: true, maxlength: 200 },
  phone: { type: String, trim: true, maxlength: 50 },
  company: { type: String, trim: true, maxlength: 150 },
  region: { type: String, required: true, maxlength: 80 },
  currency: { type: String, required: true, maxlength: 10 },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: false },
  serviceName: { type: String, required: true, maxlength: 180 },
  selectedFeatures: { type: [String], default: [] },
  estimatedPrice: { type: Number, min: 0, default: 0 },
  budget: { type: String, maxlength: 100 },
  timeline: { type: String, maxlength: 100 },
  description: { type: String, required: true, maxlength: 5000 },
  additionalRequirements: { type: String, maxlength: 5000 },
  communication: { type: String, enum: ["Email", "Phone", "WhatsApp"], default: "Email" },
  status: { type: String, enum: ["pending", "in_progress", "completed", "rejected"], default: "pending", index: true }
}, { timestamps: true });

requestSchema.index({ email: 1, requestId: 1 });

export default mongoose.model("Request", requestSchema);
