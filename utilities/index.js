const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Build the nav HTML unordered list
 ************************** */
Util.getNav = async function () {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'

  data.rows.forEach(row => {
    list += `
      <li>
        <a href="/inv/type/${row.classification_id}"
           title="See our inventory of ${row.classification_name} vehicles">
           ${row.classification_name}
        </a>
      </li>`
  })

  list += "</ul>"
  return list
}

/* ****************************************
 * Middleware For Handling Errors
 **************************************** */
Util.handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
 * Build Detail HTML for a single vehicle
 **************************************** */
Util.buildDetailHTML = function (v) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(v.inv_price)

  const miles = new Intl.NumberFormat("en-US").format(v.inv_miles)

  return `
  <section class="vehicle-detail">
    <div class="vehicle-detail-grid">
      <img src="${v.inv_image}" alt="Image of ${v.inv_make} ${v.inv_model}">
      <div class="vehicle-info">

        <h2>${v.inv_make} ${v.inv_model} (${v.inv_year})</h2>
        <h3>${price}</h3>

        <ul>
          <li><strong>Make:</strong> ${v.inv_make}</li>
          <li><strong>Model:</strong> ${v.inv_model}</li>
          <li><strong>Year:</strong> ${v.inv_year}</li>
          <li><strong>Mileage:</strong> ${miles} miles</li>
          <li><strong>Description:</strong> ${v.inv_description}</li>
        </ul>

      </div>
    </div>
  </section>
  `
}

/* ****************************************
 * Build Classification Grid (for /inv/type/:id)
 **************************************** */
Util.buildClassificationGrid = function (data) {
  let grid = ""

  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += `
        <li>
          <a href="/inv/detail/${vehicle.inv_id}"
             title="View ${vehicle.inv_make} ${vehicle.inv_model}">
            <img src="${vehicle.inv_thumbnail}"
                 alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
          </a>
          <div class="namePrice">
            <h2>
              <a href="/inv/detail/${vehicle.inv_id}">
                ${vehicle.inv_make} ${vehicle.inv_model}
              </a>
            </h2>
            <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
          </div>
        </li>
      `
    })
    grid += "</ul>"
  } else {
    grid = "<p class='notice'>Sorry, no matching vehicles could be found.</p>"
  }

  return grid
}

/* ****************************************
 * Build Classification <select> List
 **************************************** */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()

  // Para manejar ambos casos: con "rows" o sin "rows"
  const rows = data.rows ? data.rows : data

  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"

  rows.forEach(row => {
    classificationList += `<option value="${row.classification_id}"`
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += `>${row.classification_name}</option>`
  })

  classificationList += "</select>"
  return classificationList
}

module.exports = Util
