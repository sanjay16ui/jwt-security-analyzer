const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json({ message: "JWT Security Analyzer API is Running" });
});

router.post("/analyze", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token required" });
  }

  let decoded;
  let riskScore = 0;
  let warnings = [];

  try {
    // Decode without verifying (for analysis)
    decoded = jwt.decode(token, { complete: true });

    if (!decoded) {
      return res.status(400).json({ error: "Invalid token format" });
    }

    // Check Algorithm
    if (decoded.header.alg === "none") {
      riskScore += 40;
      warnings.push("Algorithm 'none' is insecure");
    }

    // Check Expiry
    if (decoded.payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > decoded.payload.exp) {
        riskScore += 30;
        warnings.push("Token is expired");
      }
    }

    // Basic Risk Rules
    if (riskScore === 0) {
      riskScore = 10; // default minimal risk
    }

  } catch (err) {
    return res.status(500).json({ error: "Analysis failed" });
  }

  res.json({
    riskScore,
    warnings,
    header: decoded.header,
    payload: decoded.payload
  });
});

module.exports = router;