const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const tokenAuth = require('../middlewares/tokenAuth');

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
router.post("/products/upload/:productId", tokenAuth, async (req, res) => {
  try {
    // verify user is seller
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Operation forbidden" });
    // update product's image url, be sure has image type in queries
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.productId, userId: req.user.id },
      {
        imageUrl: `public/products/images/${req.params.productId}.${req.query.imagetype}`,
      },
      { new: true }
    );
    //upload
    upload(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      if (req.file == undefined)
        return res.status(400).json({ message: "No file selected" });
      res.status(201).json({
        message: `File uploaded: ${req.file.filename}`,
        product: updatedProduct,
      });
    });
  } catch (err) {
    if (err.name === "ValidationError")
      res.status(400).json({ message: "Invalid product data" });
    else if (err.name === "CastError")
      res.status(400).json({ message: "Invalid product ID" });
    else res.status(500).json({ message: err.message });
  }
});

module.exports = router;
