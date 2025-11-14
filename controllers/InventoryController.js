const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invController = {}

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


module.exports = invController
