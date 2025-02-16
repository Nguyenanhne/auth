const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/authMiddleware");

router.post("/check-token", verifyFirebaseToken, (req, res) => {
  res.json({ message: "Token hợp lệ!", user: req.user });
});

module.exports = router;
