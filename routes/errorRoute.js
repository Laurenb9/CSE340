const express = require("express")
const router = express.Router()
const utilities = require("../utilities")
const errorController = require("../controllers/errorController")

router.get("/trigger-error", utilities.handleErrors(errorController.triggerError))

module.exports = router
