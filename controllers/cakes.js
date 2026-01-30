const Cake = require("../models/cake");

// 1. Get all the cakes
const getAllCakes = async (req, res, next) => {
  try {
    const cakes = await Cake.find();
    res.status(200).json(cakes);
  } catch (err) {
    next(err);
  }
};

const getSingleCake = async (req, res, next) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    rest.status(200).json(cake);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    next(err);
  }
};

// 2. Make a cake (POST)
const createCake = async (req, res, next) => {
  // #swagger.tags = ['Cakes']
  /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Cake information',
            schema: { $ref: '#/definitions/Cake' }
    } */
  try {
    const newCake = new Cake(req.body);
    const savedCake = await newCake.save();
    res.status(201).json(savedCake);
  } catch (err) {
    if (err.name === "ValidationError") {
      // Mongoose will send an error here if required fields are missing.
      return res
        .status(400)
        .json({ message: "Validation error", error: err.message });
    }
    next(err);
  }
};

// 3. Update a cake (PUT)
const updateCake = async (req, res, next) => {
  // #swagger.tags = ['Cakes']
  /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Cake information',
            schema: { $ref: '#/definitions/Cake' }
    } */
  try {
    const updatedCake = await Cake.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCake)
      return res.status(404).json({ message: "Cake not found" });
    res.status(200).json(updatedCake);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    next(err);
  }
};

// 4. Delete a cake (DELETE)
const deleteCake = async (req, res, next) => {
  // #swagger.tags = ['Cakes']
  try {
    const deletedCake = await Cake.findByIdAndDelete(req.params.id);
    if (!deletedCake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    res.status(200).json({ message: "Cake removed successfully" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid Cake ID format" });
    }
    next(err);
  }
};

module.exports = {
  getAllCakes,
  getSingleCake,
  createCake,
  updateCake,
  deleteCake,
};
