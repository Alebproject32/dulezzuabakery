const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res
      .status(401)
      .json("You don´t have permisson. Please, initialize session.");
  }
  next();
};

module.exports = {
  isAuthenticated,
};
