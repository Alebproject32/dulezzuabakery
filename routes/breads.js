const express = require("express");
const router = express.Router();
const breadsController = require("../controllers/breads");

router.get("/", breadsController.getAllBread);
router.post("/", breadsController.createBread);
router.put("/:id", breadsController.updateBread);
router.delete("/:id", breadsController.deleteBread);

module.exports = router;
