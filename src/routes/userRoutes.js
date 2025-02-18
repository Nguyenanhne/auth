const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {checkAdmin} = require("../middlewares/authMiddleware");

router.post("/block-user", checkAdmin, userController.blockUser);

router.post("/unblock-user", checkAdmin, userController.unblockUser);

module.exports = router;
