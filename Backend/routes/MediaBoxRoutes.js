const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Media = require("../models/MediaBox");
const fs = require("fs");

require('dotenv').config();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Multer disk storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname); // e.g. 171925144.png
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST: Upload new media
router.post("/uploadmedia", upload.single("image"), async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const image = `/uploads/${req.file.filename}`; // Relative path

    const newMedia = new Media({ title, description, image });
    await newMedia.save();
    res.status(201).json({ message: "Media uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/delete", async (req, res) => {
  const { password, id } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }
    const imagePath = path.join(__dirname, "..", media.image);
    await Media.findByIdAndDelete(id);

    fs.unlink(imagePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    res.json({ message: "Media deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


// GET: Get all media
router.get("/getmedia", async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
