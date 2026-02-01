const express = require("express");
const passport = require("passport");
const router = express.Router();

// 1. Documentation route
router.use("/", require("./swagger"));

// 2. My Bakery Routes (Cakes and Breads)
// I like to keep these separate for organization
router.use("/cakes", require("./cakes"));
router.use("/breads", require("./breads"));

// 3. AUTHENTICATION SECTION
// Login route using GitHub strategy as explained in the course CSE341
router.get(
  "/login",
  // This is handled by passport
  passport.authenticate("github"),
);

// Logout route - Well, here I had to check the documentation for this part
// because the syntax for the callback changed recently.
router.get("/logout", function (request, response, next) {
  request.logout(function (err) {
    if (err) {
      console.error("Logout error:", err);
      return next(err);
    }
    // After logout, I need to go back to home
    response.redirect("/");
  });
});

module.exports = router;
