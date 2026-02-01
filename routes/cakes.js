const express = require("express");
const router = express.Router();
const cakesController = require("../controllers/cakes");

// Middlewares this part is about security in my Database
const { isAuthenticated } = require("../middleware/authenticate");
const validator = require("../middleware/validate");

// Here we have GET
router.get("/", cakesController.getAllCakes);

// My old routes when anyone have access to create, update and delete cakes.
// router.post("/", cakesController.createCake);
// router.put("/:id", cakesController.updateCake);
// router.delete("/:id", cakesController.deleteCake);

// New routes to protect the access to create, update and delete cakes.
router.post(
  "/",
  isAuthenticated,
  validator.cakeValidationRules(),
  validator.validate,
  cakesController.createCake,
);

// This is the PUT route for updating cakes
router.put(
  "/:id",
  isAuthenticated,
  validator.cakeValidationRules(),
  validator.validate,
  cakesController.updateCake,
);

// finaly, here it`s the DELETE route
router.delete("/:id", isAuthenticated, cakesController.deleteCake);

module.exports = router;
