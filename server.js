require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./src/routes/authRoutes");
const getURLRoutes = require("./src/routes/getURLRoutes")

app.use("/api/auth", authRoutes);
app.use("/api/get-url", getURLRoutes);
app.use((req, res, next) => {
  console.log(`👉 Nhận request: ${req.method} ${req.url}`);
  next();
});
app.get('/ping', (req, res) => {
  res.send('Server đang hoạt động');
});

// const UPLOAD_DIR = path.join(__dirname, 'uploads');
// fs.ensureDirSync(UPLOAD_DIR);
// const storage = multer.memoryStorage(); // Lưu file vào RAM thay vì ổ cứng
// const upload = multer({ storage: storage });
// app.post("/upload_chunk", upload.single("file_chunk"), async (req, res) => {
//   try {
//     const { chunkIndex, fileName } = req.body;
//     const fileChunk = req.file;

//     if (!fileChunk) {
//       return res.status(400).json({ message: "Không có file!" });
//     }

//     const chunkPath = path.join(UPLOAD_DIR, `${fileName}.part${chunkIndex}`);
//     await fs.writeFile(chunkPath, fileChunk.buffer);

//     console.log(`✅ Chunk ${chunkIndex} uploaded`);
//     res.json({ message: `Chunk ${chunkIndex} uploaded successfully` });
//   } catch (error) {
//     console.error("❌ Lỗi khi upload chunk:", error);
//     res.status(500).json({ message: "Lỗi server" });
//   }
// });
// app.post("/merge", async (req, res) => {
//   try {
//     const { fileName } = req.body;
//     if (!fileName) {
//       console.error("❌ Không nhận được fileName từ request!");
//       return res.status(400).json({ message: "Thiếu fileName trong request" });
//     }
//     const mergedFilePath = path.join(UPLOAD_DIR, fileName);

//     const chunkFiles = fs.readdirSync(UPLOAD_DIR)
//       .filter(file => file.startsWith(fileName + ".part"))
//       .sort((a, b) => {
//         const numA = parseInt(a.split(".part")[1]);
//         const numB = parseInt(b.split(".part")[1]);
//         return numA - numB;
//       });

//     if (chunkFiles.length === 0) {
//       return res.status(400).json({ message: "Không tìm thấy chunk nào để merge!" });
//     }

//     const writeStream = fs.createWriteStream(mergedFilePath);
//     for (const chunkFile of chunkFiles) {
//       const chunkPath = path.join(UPLOAD_DIR, chunkFile);
//       const chunkBuffer = fs.readFileSync(chunkPath);
//       writeStream.write(chunkBuffer);
//       fs.unlinkSync(chunkPath); // Xóa chunk sau khi merge
//     }
//     writeStream.end();

//     console.log(`✅ File merged successfully: ${fileName}`);
//     res.json({ message: "File merged successfully", filePath: `/uploads/${fileName}` });
//   } catch (error) {
//     console.error("❌ Lỗi khi merge file:", error);
//     res.status(500).json({ message: "Lỗi server" });
//   }
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
