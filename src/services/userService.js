const admin = require("firebase-admin");

async function blockUser(uid) {
  try {
    await admin.auth().updateUser(uid, { disabled: true });
    await admin.firestore().collection("User").doc(uid).update({ isActivated: false });
    return { success: true, message: `User ${uid} has been blocked.` };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function unblockUser(uid) {
  try {
    await admin.auth().updateUser(uid, { disabled: false });
    await admin.firestore().collection("User").doc(uid).update({ isActivated: true });
    return { success: true, message: `User ${uid} has been unblocked.` };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { blockUser, unblockUser };
