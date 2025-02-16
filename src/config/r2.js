const AWS = require("aws-sdk");
require("dotenv").config(); // Đọc biến môi trường từ .env

const r2 = new AWS.S3({
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT, // URL của R2 (vd: https://<account-id>.r2.cloudflarestorage.com)
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY, // Key từ Cloudflare R2
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY, // Secret từ Cloudflare R2
  signatureVersion: "v4", // Dùng ký tên v4
});

module.exports = r2;
