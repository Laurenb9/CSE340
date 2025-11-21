const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invController = {}

// =============================
// Vehicle detail
// =============================
invController.buildDetail = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const vehicle = await invModel.getVehicleById(inv_id)

  if (!vehicle) {
    return next({ status: 404, message: "Vehicle not found" })
  }

  const nav = await utilities.getNav()
  const detailHTML = utilities.buildDetailHTML(vehicle)

  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    detailHTML
  })
}

// =============================
// Vehicles by classification
// =============================
invController.buildByClassification = async function (req, res, next) {
  const classificationId = req.params.classificationId
  const data = await invModel.getVehiclesByClassificationId(classificationId)

  if (!data || data.length === 0) {
    return next({ status: 404, message: "No vehicles found for this classification" })
  }

  const nav = await utilities.getNav()
  const className = data[0].classification_name
  const grid = utilities.buildClassificationGrid(data)

  res.render("inventory/classification", {
    title: `${className} vehicles`,
    nav,
    grid
  })
}

// =============================
// Management View (Task 1)
// =============================
invController.managementView = async (req, res, next) => {
  try {
    const nav = await utilities.getNav()

    const successMessages = req.flash("success") || []
    const errorMessages = req.flash("error") || []
    const infoMessages = req.flash("info") || []

    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      successMessages,
      errorMessages,
      infoMessages,
    })
  } catch (err) {
    next(err)
  }
}

// =============================
// Task 2 & 3 – Stubs (placeholder controllers)
// =============================
invController.showAddClassificationForm = async (req, res) => {
  const nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null
  })
}

invController.showAddVehicleForm = async (req, res) => {
  const nav = await utilities.getNav()
  res.render("inventory/add-vehicle", {
    title: "Add New Vehicle",
    nav,
    errors: null
  })
}

invController.addVehicle = async (req, res, next) => {
  try {
    const {
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      inv_image,
      inv_thumbnail
    } = req.body

    const result = await invModel.addVehicle({
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      inv_image,
      inv_thumbnail
    })

    if (result) {
      req.flash('success', 'Vehicle added successfully!')

      // rebuild classification list / nav so new item appears
      const nav = await utilities.getNav()
      return res.render('inventory/management', {
        title: 'Inventory Management',
        nav,
        successMessages: req.flash('success'),
        errorMessages: [],
        infoMessages: []
      })
    } else {
      req.flash('error', 'Failed to add the vehicle.')
      // Rebuild classification list and render add form with sticky data
      const classificationList = await utilities.buildClassificationList(req.body.classification_id)
      const nav = await utilities.getNav()
      return res.status(500).render('inventory/add-vehicle', {
        title: 'Add New Vehicle',
        nav,
        classificationList,
        errors: [],
        successMessages: [],
        errorMessages: req.flash('error'),
        invData: req.body
      })
    }
  } catch (err) {
    next(err)
  }
}


module.exports = invController
