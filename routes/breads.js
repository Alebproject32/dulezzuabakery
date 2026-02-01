const express = require("express");
const router = express.Router();
const breadsController = require("../controllers/breads");

// Here are the security and validation stuff
const { isAuthenticated } = require("../middleware/authenticate");
const validator = require("../middleware/validate");

// This is my public routes
router.get("/", breadsController.getAllBread);

// Old breads routes
// I choose to keep them to reused in the future
//router.post("/", breadsController.createBread);
//router.put("/:id", breadsController.updateBread);
//router.delete("/:id", breadsController.deleteBread);

// Protecting breads routes
router.post(
  "/",
  isAuthenticated,
  validator.breadValidationRules(),
  validator.validate,
  breadsController.createBread,
);

// In this case PUT is about UPDATE
router.put(
  "/:id",
  isAuthenticated,
  validator.breadValidationRules(),
  validator.validate,
  breadsController.updateBread,
);

// DELETE: Only need to be authenticated, no validation rules for body here.
router.delete("/:id", isAuthenticated, breadsController.deleteBread);

module.exports = router;
