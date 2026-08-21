import express from "express";
import Review from "../models/Review.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.find({ status: "approved" }).sort({ createdAt: -1 }).limit(30).lean();
    res.json(reviews);
  } catch (err) { next(err); }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, company, rating, review } = req.body || {};
    const numericRating = Number(rating);
    if (!name?.trim() || !email?.trim() || !emailPattern.test(email) || !Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5 || !review?.trim()) {
      return res.status(400).json({ message: "Please provide a valid name, email, rating and review." });
    }
    await Review.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim(),
      rating: numericRating,
      review: review.trim()
    });
    res.status(201).json({ message: "Review submitted for approval." });
  } catch (err) { next(err); }
});

router.get("/admin", requireAdmin, async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    res.json(reviews);
  } catch (err) { next(err); }
});

router.patch("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const allowed = ["pending", "approved", "rejected"];
    if (!allowed.includes(req.body?.status)) return res.status(400).json({ message: "Invalid review status." });
    const review = await Review.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).lean();
    if (!review) return res.status(404).json({ message: "Review not found." });
    res.json(review);
  } catch (err) { next(err); }
});

router.delete("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found." });
    res.json({ message: "Review deleted." });
  } catch (err) { next(err); }
});

export default router;
