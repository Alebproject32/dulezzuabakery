const { body, validationResult } = require("express-validator");

// I was to be sure everything is correct for the bakery products.
const cakeValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("flavor").notEmpty().withMessage("Flavor is required"),
    body("price")
      .isNumeric()
      .withMessage("Price must be a number, please don`t use letters."),
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
      .matches(/^\d+\s?grs$/)
      .withMessage("Weight must be at least 100 grs"),
    body("ingredients")
      .notEmpty()
      .withMessage("You must typing at least 4 ingredients."),
    body("isVegan").isBoolean().withMessage("You need to type True or False."),
  ];
};

// this function help me to catch errors from rules
const validate = (request, response, next) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  // I am using map to push the errors into my array
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  console.log("OOps! Validation failed in the middleware!");

  return response.status(412).json({
    success: false,
    message: "Validation error in datas",
    errors: extractedErrors,
  });
};

module.exports = {
  cakeValidationRules,
  breadValidationRules,
  validate,
};
