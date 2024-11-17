// controllers/carController.js
const Car = require('../models/Car');

exports.createCar = async (req, res) => {
  try {
    const carData = { ...req.body, user: req.user.id, images: req.files.map(file => file.path) };
    const car = new Car(carData);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const updates = { ...req.body };

    if (req.files && req.files.length > 0) {
      updates.images = req.files.map(file => file.path);
    }

    const car = await Car.findOneAndUpdate(
      { _id: carId, user: req.user.id },
      updates,
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ error: 'Car not found or not authorized' });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;

    const car = await Car.findOneAndDelete({ _id: carId, user: req.user.id });

    if (!car) {
      return res.status(404).json({ error: 'Car not found or not authorized' });
    }

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCarDetails = async (req, res) => {
  try {
    const carId = req.params.id;

    const car = await Car.findOne({ _id: carId, user: req.user.id });

    if (!car) {
      return res.status(404).json({ error: 'Car not found or not authorized' });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchCars = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required for search' });
    }

    const regex = new RegExp(keyword, 'i');

    const cars = await Car.find({
      user: req.user.id,
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { tags: { $regex: regex } }
      ]
    });

    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
