const {auth, admin} = require("../config/firebase");

// const verifyFirebaseToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Không có token, truy cập bị từ chối!" });
//     }
//     console.log("Token:", token);
    
//     const decodedToken = await auth.verifyIdToken(token);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     res.status(403).json({ message: "Token không hợp lệ!", error: error.message });
//   }
// };
async function checkAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ success: false, message: "Không có token, truy cập bị từ chối!" });
    }

    console.log("Token:", token);

    const decodedToken = await auth.verifyIdToken(token);

    const userDoc = await admin.firestore().collection("User").doc(decodedToken.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ success: false, message: "Không tìm thấy user" });
    }

    const userData = userDoc.data();

    if (userData.role !== "admin") {
      return res.status(403).json({ success: false, message: "Bạn không phải admin." });
    }
    console.log("Xác thực admin thành công");
    next(); 
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized: " + error.message });
  }
}
async function checkUser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ success: false, message: "Không có token, truy cập bị từ chối!" });
    }

    console.log("Token:", token);

    const decodedToken = await auth.verifyIdToken(token);

    const userDoc = await admin.firestore().collection("User").doc(decodedToken.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ success: false, message: "Không tìm thấy user" });
    }

    const userData = userDoc.data();

    if (userData.role !== "user") {
      return res.status(403).json({ success: false, message: "Bạn không phải user." });
    }
    console.log("Xác thực user thành công");
    next(); 
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized: " + error.message });
  }
}

module.exports = {checkAdmin, checkUser};
