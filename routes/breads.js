const express = require("express");
const router = express.Router();
const breadsController = require("../controllers/breads");
const { isAuthenticated } = require("../middleware/authenticate");
const validator = require("../middleware/validate");

router.get("/", breadsController.getAllBread);

// Old breads routes
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
router.put(
  "/:id",
  isAuthenticated,
  validator.breadValidationRules(),
  validator.validate,
  breadsController.updateBread,
);
router.delete("/:id", isAuthenticated, breadsController.deleteBread);

module.exports = router;
