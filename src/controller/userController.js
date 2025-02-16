const userService = require("../services/userService");

async function blockUser(req, res) {
  try {
    const { uid } = req.body;
    const result = await userService.blockUser(uid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function unblockUser(req, res) {
  try {
    const { uid } = req.body;
    const result = await userService.unblockUser(uid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { blockUser, unblockUser };
