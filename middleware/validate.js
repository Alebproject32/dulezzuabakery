const { body, validationResult } = require("express-validator");

const cakeValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("flavor").notEmpty().withMessage("Flavor is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("servings").isInt({ min: 1 }).withMessage("Slices msut be at least 1"),
    body("isAvailable")
      .isBoolean()
      .withMessage("isAvailable should be a boolean value"),
  ];
};

const breadValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("weight")
      .isInt({ min: 100 })
      .withMessage("Weight must be at least 100 grs"),
    body("ingredients")
      .notEmpty()
      .withMessage("You must typing at least 4 ingredients."),
    body("isvegan").isBoolean().withMessage("You need to type True or False."),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(412).json({
    success: false,
    message: "Validation error",
    errors: extractedErrors,
  });
};

module.exports = {
  cakeValidationRules,
  breadValidationRules,
  validate,
};
