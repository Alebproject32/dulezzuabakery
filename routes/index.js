const express = require("express");
const router = express.Router();

router.use("/cakes", require("./cakes"));
router.use("/breads", require("./breads"));

module.exports = router;
