const Bread = require("../models/bread");

// My logic, I think prioritizing my endpoints
// (like: 1.- GET, 2.- POST, 3.- PUT, and 4.- DELETE) is better so that other programmers and coders can find errors and demostrate professionalism.
// 1. Get all the breads
const getAllBread = async (request, response, next) => {
  try {
    const breadslist = await Bread.find();
    console.log("Fetch request successful");
    // However, I am trying to search all breads in my database
    response.status(200).json(breadslist);
  } catch (err) {
    console.log("I am sorry but you have an error to get breads list.", err);
    next(err);
  }
};

// But in the process of redo all my functions to this assignment.
// what happen if I would like to get one bread from breads list.
const getSingleBread = async (request, response, next) => {
  try {
    const idBread = request.params.id;
    const myBread = await Bread.findById(idBread);
    if (!myBread) {
      return response.status(404).json({
        message: "I am sorry your kind of Bread is not found in the list",
      });
    }
    response.status(200).json(myBread);
  } catch (err) {
    if (err.name === "CastError") {
      return response.status(400).send({
        message:
          "Hey budy! Your ID has an Invalid format. Please check out anf try it again.",
      });
    }
    next(err);
  }
};

// 2. Make a bread (POST)
const createBread = async (request, response, next) => {
  // I will keep swagger information because let me know
  // where I worked with them at the beginning of the course to remember in the future.
  // #swagger.tags = ['Breads']
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Bread information',
      schema: { $ref: '#/definitions/Bread' }
  } */
  try {
    const newBread = new Bread(request.body);
    const saveBread = await newBread.save();
    response.status(201).json(saveBread);
  } catch (err) {
    console.log("Validation failed on createBread");
    if (err.name === "ValidationError") {
      return response.status(400).json({
        message:
          "Error message: Please review your datas again because some information are lost to create your bread. I can wait for your required.",
        details: err.message,
      });
    }
    next(err);
  }
};

// 3. Update a bread (PUT)
const updateBread = async (request, response, next) => {
  // #swagger.tags = ['Breads']
  /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Bread information',
            schema: { $ref: '#/definitions/Bread' }
    } */
  try {
    const updateById = request.params.id;
    const newdatas = request.body;
    const updatedBread = await Bread.findByIdAndUpdate(updateById, newdatas, {
      new: true,
      runValidators: true,
    });
    if (!updatedBread)
      return response
        .status(404)
        .json({ message: "I am lost to searching your bread to update budy" });
    response.status(200).json(updatedBread);
  } catch (err) {
    if (err.name === "CastError") {
      return response
        .status(400)
        .json({ message: "WOW, your ID format is not valid." });
    }
    next(err);
  }
};

// 4. Delete a bread (DELETE)
const deleteBread = async (request, response, next) => {
  // #swagger.tags = ['Breads']
  try {
    const deleteById = request.params.id;
    const deletedBread = await Bread.findByIdAndDelete(deleteById);
    if (!deletedBread) {
      return response.status(404).json({
        message:
          "Error: I can`t delete because this kind of bread doesn`t exist.",
      });
    }
    response.status(200).json({
      message:
        "Awesome, give me that five, your bread was delete from our Database.",
    });
  } catch (err) {
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
