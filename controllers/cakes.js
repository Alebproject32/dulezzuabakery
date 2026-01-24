const Cake = require("../models/cake");

// 1. OBTENER TODAS LAS TORTAS
const getAllCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.status(200).json(cakes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las tortas", error: error.message });
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
    // Aquí Mongoose enviará el error si faltan campos obligatorios
    res
      .status(400)
      .json({ message: "Error en la validación", error: error.message });
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
      return res.status(404).json({ message: "Torta no encontrada" });
    res.status(200).json(updatedCake);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar", error: error.message });
  }
};

// 4. Delete a cake (DELETE)
const deleteCake = async (req, res) => {
  // #swagger.tags = ['Cakes']
  try {
    const deletedCake = await Cake.findByIdAndDelete(req.params.id);
    if (!deletedCake)
      return res.status(404).json({ message: "Torta no encontrada" });
    res.status(200).json({ message: "Torta eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar", error: error.message });
  }
};

module.exports = { getAllCakes, createCake, updateCake, deleteCake };
