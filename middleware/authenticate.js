const isAuthenticated = (request, response, next) => {
  if (request.session.user === undefined) {
    return response
      .status(401)
      .json("You don´t have permisson. Please, initialize session.");
  }
  next();
};

module.exports = {
  isAuthenticated,
};
