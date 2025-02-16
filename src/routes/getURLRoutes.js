const express = require("express");
require("dotenv").config();
const r2 = require("../config/r2"); // Import cấu hình R2
const router = express.Router();
const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const domain = "https://filmfinder.shop/"
// API lấy URL video từ R2 nhưng nhận filmID từ Header
router.post("/get-video-url", async (req, res) => {
    try {
        const filmID = req.headers["film-id"];
        if (!filmID) {
            return res.status(400).json({ success: false, message: "filmID is required" });
        }

        const videoKey = `video/${filmID}/video_master.m3u8`;
        let videoUrl = null;


        // Kiểm tra nếu video tồn tại
        try {
            await r2.headObject({ Bucket: BUCKET_NAME, Key: videoKey }).promise();
            videoUrl = `${domain}video/${filmID}/video_master.m3u8`;

        } catch (err) {
            console.warn(`Video not found: ${videoKey}`);
        }

        return res.json({ success: true, videoUrl: videoUrl });

    } catch (error) {
        console.error("Error generating URL:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

//API lấy Trailer URL từ R2
router.post("/get-trailer-url", async (req, res) => {
    try {
        const filmID = req.headers["film-id"];
        if (!filmID) {
            return res.status(400).json({ success: false, message: "filmID is required" });
        }
        const trailerKey = `trailer/${filmID}/video_master.m3u8`;
        let trailerUrl = null;

        // Kiểm tra nếu trailer tồn tại
        try {
            await r2.headObject({ Bucket: BUCKET_NAME, Key: trailerKey }).promise();
            trailerUrl = `${domain}trailer/${filmID}/video_master.m3u8`;

        } catch (err) {
            console.warn(`Trailer not found: ${trailerKey}`);
        }
        return res.json({ success: true, trailerUrl: trailerUrl });

    } catch (error) {
        console.error("Error generating URL:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
