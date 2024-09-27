const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: "./public/products/images",
  filename: function (req, file, cb) {
    cb(null, req.params.productId + path.extname(file.originalname));
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("productImage");

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Route to upload image
router.post("/products/upload/:productId", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ message: "No file selected" });
      } else {
        res.status(201).json({ message: `File uploaded: ${req.file.filename}` });
      }
    }
  });
});

module.exports = router;
