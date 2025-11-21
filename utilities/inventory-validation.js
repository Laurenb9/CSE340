// utilities/inventory-validation.js
const { body, validationResult } = require("express-validator");
const utilities = require("./index"); // para getNav

// ====== VALIDATION RULES ======
const vehicleRules = () => {
  return [
    body("inv_make")
      .trim().escape()
      .isLength({ min: 3 })
      .withMessage("Make must be at least 3 characters."),

    body("inv_model")
      .trim().escape()
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters."),

    body("inv_year")
      .isInt({ min: 1900, max: 2099 })
      .withMessage("Enter a valid year."),

    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),

    body("inv_description")
      .trim().escape()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters."),

    body("classification_id")
      .isInt().withMessage("Classification is required.")
  ];
};

// ====== PROCESS VALIDATION RESULTS ======
const checkVehicleData = async (req, res, next) => {
  const errors = validationResult(req);
  const nav = await utilities.getNav();
  const classificationList =
    await utilities.buildClassificationList(req.body.classification_id);

  if (!errors.isEmpty()) {
    return res.render("inventory/add-vehicle", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: errors.array(),
      // sticky data:
      ...req.body
    });
  }
  next();
};

module.exports = {
  vehicleRules,
  checkVehicleData
};
