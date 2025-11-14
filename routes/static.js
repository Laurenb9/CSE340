const express = require("express")
const router = express.Router()

// IMPORTANTE: debes importar utilities e invController
const utilities = require("../utilities")
const invController = require("../controllers/InventoryController")

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"))
router.use("/css", express.static(__dirname + "/public/css"))
router.use("/js", express.static(__dirname + "/public/js"))
router.use("/images", express.static(__dirname + "/public/images"))

// Vehicle detail route
router.get("/inv/detail/:inv_id", 
    utilities.handleErrors(invController.buildDetail))

module.exports = router

