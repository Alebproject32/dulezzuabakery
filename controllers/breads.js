const Bread = require("../models/bread");

// 1. Get all the breads
const getAllBread = async (req, res, next) => {
  try {
    const breads = await Bread.find();
    res.status(200).json(breads);
  } catch (err) {
    next(err);
  }
};

const getSingleBread = async (req, res, next) => {
  try {
    const bread = await Bread.findById(req.params.id);
    if (!bread) {
      return res.status(404).json({ message: "Bread not found" });
    }
    res.status(200).json(cake);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    next(err);
  }
};

// 2. Make a bread (POST)
const createBread = async (req, res, next) => {
  // #swagger.tags = ['Breads']
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Bread information',
      schema: { $ref: '#/definitions/Bread' }
  } */
  try {
    const bread = new Bread(req.body);
    const newBread = await bread.save();
    res.status(201).json(newBread);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", error: err.message });
    }
    next(err);
  }
};

// 3. Update a bread (PUT)
const updateBread = async (req, res, next) => {
  // #swagger.tags = ['Breads']
  /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Bread information',
            schema: { $ref: '#/definitions/Bread' }
    } */
  try {
    const updatedBread = await Bread.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedBread)
      return res.status(404).json({ message: "Bread not found" });
    res.status(200).json(updatedBread);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    next(err);
  }
};

// 4. Delete a bread (DELETE)
const deleteBread = async (req, res, next) => {
  // #swagger.tags = ['Breads']
  try {
    const deletedBread = await Bread.findByIdAndDelete(req.params.id);
    if (!deletedBread) {
      return res.status(404).json({ message: "Bread not found" });
    }
    res.status(200).json({ message: "Bread removed successfully" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid Bread ID format" });
    }
    next(err);
  }
};

module.exports = {
  getAllBread,
  getSingleBread,
  createBread,
  updateBread,
  deleteBread,
};
