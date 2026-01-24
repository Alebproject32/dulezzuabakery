const Cake = require("../models/cake");

// 1. Get all the cakes
const getAllCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.status(200).json(cakes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error obtaining the cakes", error: error.message });
  }
};

// 2. Make a cake (POST)
const createCake = async (req, res) => {
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
  } catch (error) {
    // Mongoose will send an error here if required fields are missing.
    res.status(400).json({ message: "Validation error", error: error.message });
  }
};

// 3. Update a cake (PUT)
const updateCake = async (req, res) => {
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
  } catch (error) {
    res.status(400).json({ message: "Error updating", error: error.message });
  }
};

// 4. Delete a cake (DELETE)
const deleteCake = async (req, res) => {
  // #swagger.tags = ['Cakes']
  try {
    const deletedCake = await Cake.findByIdAndDelete(req.params.id);
    if (!deletedCake)
      return res.status(404).json({ message: "Cake not found" });
    res.status(200).json({ message: "Cake removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete error", error: error.message });
  }
};

module.exports = { getAllCakes, createCake, updateCake, deleteCake };
