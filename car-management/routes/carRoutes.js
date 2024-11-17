// routes/carRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createCar,
  listCars,
  updateCar,
  deleteCar,
  getCarDetails,
  searchCars
} = require('../controllers/carController');
const multer = require('multer');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  }
});
const upload = multer({ storage });

const router = express.Router();

// Routes
// Create a car
router.post('/', authMiddleware, upload.array('images', 10), createCar);

// List all cars of a logged-in user
router.get('/', authMiddleware, listCars);

// Get details of a specific car
router.get('/:id', authMiddleware, getCarDetails);

// Update a specific car
router.put('/:id', authMiddleware, upload.array('images', 10), updateCar);

// Delete a specific car
router.delete('/:id', authMiddleware, deleteCar);

// Search cars by keyword
router.get('/search', authMiddleware, searchCars);

module.exports = router;
