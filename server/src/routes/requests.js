import express from "express";
import mongoose from "mongoose";
import Request from "../models/Request.js";
import Service from "../models/Service.js";
import { createRequestId } from "../utils/requestId.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res, next) => {
  try {
    const {
      name, email, phone, company, region, currency, serviceId, serviceName,
      selectedFeatures, estimatedPrice, budget, timeline, description,
      additionalRequirements, communication
    } = req.body || {};

    if (!name?.trim() || !email?.trim() || !emailPattern.test(email) || !region?.trim() || !currency?.trim() || !serviceName?.trim() || !description?.trim()) {
      return res.status(400).json({ message: "Please complete all required fields with valid information." });
    }

    let service = null;
    if (serviceId && mongoose.Types.ObjectId.isValid(serviceId)) {
      service = await Service.findById(serviceId).lean();
    }

    const request = await Request.create({
      requestId: createRequestId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      company: company?.trim(),
      region: region.trim(),
      currency: currency.trim(),
      serviceId: service?._id,
      serviceName: service?.name || serviceName.trim(),
      selectedFeatures: Array.isArray(selectedFeatures) ? selectedFeatures.slice(0, 50).map(String) : [],
      estimatedPrice: Number.isFinite(Number(estimatedPrice)) ? Math.max(0, Number(estimatedPrice)) : 0,
      budget: budget?.trim(),
      timeline: timeline?.trim(),
      description: description.trim(),
      additionalRequirements: additionalRequirements?.trim(),
      communication: ["Email", "Phone", "WhatsApp"].includes(communication) ? communication : "Email"
    });

    res.status(201).json({ requestId: request.requestId, status: request.status });
  } catch (err) { next(err); }
});

router.post("/track", async (req, res, next) => {
  try {
    const requestId = String(req.body?.requestId || "").trim().toUpperCase();
    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!requestId || !email) return res.status(400).json({ message: "Request ID and email are required." });

    const request = await Request.findOne({ requestId, email }).select("requestId serviceName status estimatedPrice currency createdAt updatedAt").lean();
    if (!request) return res.status(404).json({ message: "Request not found. Check your Request ID and email address." });

    res.json(request);
  } catch (err) { next(err); }
});

router.get("/admin", requireAdmin, async (req, res, next) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 }).lean();
    res.json(requests);
  } catch (err) { next(err); }
});

router.get("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id).lean();
    if (!request) return res.status(404).json({ message: "Request not found." });
    res.json(request);
  } catch (err) { next(err); }
});

router.patch("/admin/:id/status", requireAdmin, async (req, res, next) => {
  try {
    const allowed = ["pending", "in_progress", "completed", "rejected"];
    if (!allowed.includes(req.body?.status)) return res.status(400).json({ message: "Invalid status." });
    const request = await Request.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).lean();
    if (!request) return res.status(404).json({ message: "Request not found." });
    res.json(request);
  } catch (err) { next(err); }
});

router.delete("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found." });
    if (request.status !== "rejected") return res.status(400).json({ message: "Only rejected requests can be deleted." });
    await request.deleteOne();
    res.json({ message: "Rejected request deleted." });
  } catch (err) { next(err); }
});

export default router;
