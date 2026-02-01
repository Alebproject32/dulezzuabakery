const Cake = require("../models/cake");

// 1. Getting the full list of cakes for the bakery
// I prefer to keep my code organized by numbers 1-4 for better reading.
const getAllCakes = async (request, response, next) => {
  try {
    const allCakes = await Cake.find();
    console.log("Cakes list requested successfully");
    // Sending the result to the client
    response.status(200).json(allCakes);
  } catch (err) {
    console.error("I have a problem with your cakes list:", err);
    next(err);
  }
};

// Search for a specific cake using the ID
const getSingleCake = async (request, response, next) => {
  try {
    const cakeId = request.params.id;
    const foundCake = await Cake.findById(cakeId);

    if (!foundCake) {
      return response.status(404).json({
        message: "Oops! This cake is not in our display case (Not found)",
      });
    }
    response.status(200).json(foundCake);
  } catch (err) {
    if (err.name === "CastError") {
      return response
        .status(400)
        .send("The ID you sent has a wrong format, please check it.");
    }
    next(err);
  }
};

// 2. Add a new cake to the database (POST)
const createCake = async (request, response, next) => {
  // Swagger tags help me to test this in the documentation
  // #swagger.tags = ['Cakes']
  /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Cake information',
            schema: { $ref: '#/definitions/Cake' }
    } */
  try {
    // Correcting req to request here to avoid the crash
    const myNewCake = new Cake(request.body);
    const savedResult = await myNewCake.save();

    console.log("A new cake was created!");
    response.status(201).json(savedResult);
  } catch (err) {
    if (err.name === "ValidationError") {
      return response.status(400).json({
        message: "Wait! Your cake data is incomplete. Please review it.",
        error: err.message,
      });
    }
    next(err);
  }
};

// 3. Update cake details (PUT)
const updateCake = async (request, response, next) => {
  // #swagger.tags = ['Cakes']
  try {
    const idToUpdate = request.params.id;
    const updatedData = request.body;

    const cakeUpdated = await Cake.findByIdAndUpdate(idToUpdate, updatedData, {
      new: true, // This returns the cake AFTER the change
      runValidators: true,
    });

    if (!cakeUpdated) {
      return response
        .status(404)
        .json({ message: "I can't update a cake that doesn't exist" });
    }

    response.status(200).json(cakeUpdated);
  } catch (err) {
    if (err.name === "CastError") {
      return response
        .status(400)
        .json({ message: "That ID format is not valid for update" });
    }
    next(err);
  }
};

// 4. Remove a cake from the system (DELETE)
const deleteCake = async (request, response, next) => {
  // #swagger.tags = ['Cakes']
  try {
    const cakeToDelete = request.params.id;
    const result = await Cake.findByIdAndDelete(cakeToDelete);

    if (!result) {
      return response
        .status(404)
        .json({ message: "The cake was not found in the system.." });
    }

    response.status(200).json({
      message: "Done! The cake was removed from the database correctly.",
    });
  } catch (err) {
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
