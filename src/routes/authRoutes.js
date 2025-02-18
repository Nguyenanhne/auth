const express = require("express");
const router = express.Router();
const {checkAdmin, checkUser} = require("../middlewares/authMiddleware");

router.post("/check-admin", checkAdmin, (req, res) => {
  res.json({ message: "Token hợp lệ!", user: req.user });
});
router.post("/check-user", checkUser, (req, res) => {
  res.json({ message: "Token hợp lệ!", user: req.user });
});
module.exports = router;
