import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    // Get and validate request data
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim()
        : "";

    const password =
      typeof req.body?.password === "string"
        ? req.body.password
        : "";

    // Get environment variables safely
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
        ? process.env.JWT_SECRET.trim()
        : "";

    // Check login request
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    // Check environment variables
    if (!configuredEmail || !configuredHash || !jwtSecret) {
      console.error("Admin authentication environment variables are missing.");

      return res.status(503).json({
        message: "Admin authentication is not configured correctly."
      });
    }

    // Validate bcrypt hash
    if (
      !/^\$2[aby]\$\d{2}\$/.test(configuredHash) ||
      configuredHash.length !== 60
    ) {
      console.error("ADMIN_PASSWORD_HASH is invalid.", {
        hashLength: configuredHash.length
      });

      return res.status(500).json({
        message: "Admin password configuration is invalid."
      });
    }

    // Temporary debug information
    // This does NOT log your password, hash, or JWT secret
    console.log("LOGIN DEBUG:", {
      email,
      passwordType: typeof password,
      passwordLength: password.length,
      configuredEmailExists: Boolean(configuredEmail),
      configuredHashType: typeof configuredHash,
      configuredHashLength: configuredHash.length,
      jwtSecretExists: Boolean(jwtSecret)
    });

    // Validate email
    const validEmail =
      email.toLowerCase() === configuredEmail;

    // Validate password
    const validPassword = await bcrypt.compare(
      password,
      configuredHash
    );

    // Reject invalid credentials
    if (!validEmail || !validPassword) {
      return res.status(401).json({
        message: "Invalid admin credentials."
      });
    }

    // Create JWT token
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

    return res.status(200).json({
      token,
      admin: {
        email: configuredEmail,
        role: "admin"
      }
    });

  } catch (error) {
    console.error("Admin login error:", {
      message: error?.message,
      stack: error?.stack
    });

    return res.status(500).json({
      message: error?.message || "Server error during login."
    });
  }
});

export default router;