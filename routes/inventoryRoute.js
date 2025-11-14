const express = require("express")
const router = express.Router()
const invController = require("../controllers/InventoryController")
const utilities = require("../utilities")

// Vehicles by classification
router.get("/type/:classificationId", 
    utilities.handleErrors(invController.buildByClassification))

// Vehicle detail route
router.get("/detail/:inv_id", 
    utilities.handleErrors(invController.buildDetail))

module.exports = router
