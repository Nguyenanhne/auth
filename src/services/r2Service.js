const r2 = require("../config/r2");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

// Cấu hình Multer để nhận file từ request
const storage = multer.memoryStorage(); // Lưu file vào bộ nhớ trước khi tải lên
const upload = multer({ storage });

// Hàm tải tệp lên R2
const uploadToR2 = async (file) => {
  const fileKey = `${uuidv4()}-${file.originalname}`; // Đặt tên file ngẫu nhiên

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // Cho phép truy cập công khai
  };

  await r2.upload(params).promise();
  return `https://${bucketName}.${process.env.R2_ENDPOINT}/${fileKey}`; // URL truy cập file
};

module.exports = { upload, uploadToR2 };
