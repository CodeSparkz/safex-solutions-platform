import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const services = await Service.find({ active: true }).sort({ category: 1, name: 1 }).lean();
    res.json(services);
  } catch (err) { next(err); }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, active: true }).lean();
    if (!service) return res.status(404).json({ message: "Service not found." });
    res.json(service);
  } catch (err) { next(err); }
});

export default router;
