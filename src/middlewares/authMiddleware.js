const { auth } = require("../config/firebase");

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không có token, truy cập bị từ chối!" });
    }
    console.log("Token:", token);
    
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token không hợp lệ!", error: error.message });
  }
};

module.exports = verifyFirebaseToken;
