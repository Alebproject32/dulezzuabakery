const express = require("express");
const router = express.Router();
const cakesController = require("../controllers/cakes");
const { isAuthenticated } = require("../middleware/authenticate");
const validator = require("../middleware/validate");

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
router.put(
  "/:id",
  isAuthenticated,
  validator.cakeValidationRules(),
  validator.validate,
  cakesController.updateCake,
);
router.delete("/:id", isAuthenticated, cakesController.deleteCake);

module.exports = router;
