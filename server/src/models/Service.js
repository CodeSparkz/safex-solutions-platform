import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, min: 0, default: 0 }
}, { _id: false });

const serviceSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, default: "/assets/safex-logo.png" },
  basePrice: { type: Number, required: true, min: 0 },
  features: { type: [featureSchema], default: [] },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
