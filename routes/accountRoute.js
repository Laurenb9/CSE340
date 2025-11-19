const express = require("express")
const router = express.Router()
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')
const accountController = require("../controllers/accountController")

// Login view
router.get("/login", accountController.buildLogin)
// Registration view
router.get("/register", accountController.buildRegister)
//ruta njkd
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)
// Exportar router
module.exports = router
