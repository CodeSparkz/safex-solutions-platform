import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim()
        : "";

    const password =
      typeof req.body?.password === "string"
        ? req.body.password
        : "";

    const configuredEmail =
      typeof process.env.ADMIN_EMAIL === "string"
        ? process.env.ADMIN_EMAIL.trim().toLowerCase()
        : "";

    const configuredHash =
      typeof process.env.ADMIN_PASSWORD_HASH === "string"
        ? process.env.ADMIN_PASSWORD_HASH.trim()
        : "";

    const jwtSecret =
      typeof process.env.JWT_SECRET === "string"
        ? process.env.JWT_SECRET
        : "";

    // Check request data
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    // Check server configuration
    if (!configuredEmail || !configuredHash || !jwtSecret) {
      console.error("Admin authentication environment variables are missing.");

      return res.status(503).json({
        message: "Admin authentication is not configured correctly."
      });
    }

    // Validate bcrypt hash
    if (!/^\$2[aby]\$\d{2}\$/.test(configuredHash)) {
      console.error("ADMIN_PASSWORD_HASH is not a valid bcrypt hash.");

      return res.status(500).json({
        message: "Admin password configuration is invalid."
      });
    }

    const validEmail =
      email.toLowerCase() === configuredEmail;

    const validPassword = await bcrypt.compare(
      password,
      configuredHash
    );

    if (!validEmail || !validPassword) {
      return res.status(401).json({
        message: "Invalid admin credentials."
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        email: configuredEmail
      },
      jwtSecret,
      {
        expiresIn: "8h"
      }
    );

    return res.json({
      token,
      admin: {
        email: configuredEmail,
        role: "admin"
      }
    });

  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Server error during login."
    });
  }
});

export default router;