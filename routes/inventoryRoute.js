const express = require("express")
const router = express.Router()
const InventoryController = require("../controllers/InventoryController")
const utilities = require("../utilities")

// Vehicles by classification
router.get("/type/:classificationId", 
    utilities.handleErrors(InventoryController.buildByClassification))

// Vehicle detail route
router.get("/detail/:inv_id", 
    utilities.handleErrors(InventoryController.buildDetail))

// These endpoints will trigger controllers that render the add forms (Task 2 & 3).
// Implement their controllers later; here only define the route targets.
router.get(
  "/add-classification",
  utilities.handleErrors(InventoryController.showAddClassificationForm)
)

router.get('/add-vehicle', InventoryController.showAddVehicleForm);

// Error-handler middleware for this router (requirement del enunciado)
router.use(function (err, req, res, next) {
  console.error('Inventory route error:', err);
  res.status(500).render('errors/500', { title: 'Server Error' });
});

// GET already exists:
router.get('/add-vehicle',
  utilities.handleErrors(InventoryController.showAddVehicleForm)
)

// POST to add vehicle
const invValidate = require('../utilities/inventory-validation')

router.post(
  '/add-vehicle',
  invValidate.vehicleRules(),
  invValidate.checkVehicleData,
  utilities.handleErrors(InventoryController.addVehicle)
)

module.exports = router
