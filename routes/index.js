const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/cakes", require("./cakes"));
router.use("/breads", require("./breads"));

router.get("/logout", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
