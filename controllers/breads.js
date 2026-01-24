const Bread = require("../models/bread");

// 1. Get all the breads
const getAllBread = async (req, res) => {
  try {
    const breads = await Bread.find();
    res.status(200).json(breads);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error obtaining the cakes", error: err.message });
  }
};

// 2. Make a bread (POST)
const createBread = async (req, res) => {
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
    res.status(400).json({ message: "Validation error", error: err.message });
  }
};

// 3. Update a bread (PUT)
const updateBread = async (req, res) => {
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
  } catch (error) {
    res.status(400).json({ message: "Error updating", error: error.message });
  }
};

// 4. Delete a bread (DELETE)
const deleteBread = async (req, res) => {
  // #swagger.tags = ['Breads']
  try {
    const deletedBread = await Bread.findByIdAndDelete(req.params.id);
    if (!deletedBread)
      return res.status(404).json({ message: "Bread not found" });
    res.status(200).json({ message: "Bread removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete error", error: error.message });
  }
};

module.exports = { getAllBread, createBread, updateBread, deleteBread };
