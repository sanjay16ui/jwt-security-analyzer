const express = require("express");
const router = express.Router();

router.get("/status", (req, res) => {
  res.json({
    success: true,
    message: "JWT Security Analyzer API is Running"
  });
});

module.exports = router;