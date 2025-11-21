const pool = require("../database")

async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  )
}

async function getVehicleById(invId) {
  const sql = "SELECT * FROM public.inventory WHERE inv_id = $1"
  const result = await pool.query(sql, [invId])
  return result.rows[0]
}

async function getVehiclesByClassificationId(classificationId) {
  try {
    const sql = `
      SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1
    `
    const result = await pool.query(sql, [classificationId])
    return result.rows
  } catch (error) {
    console.error("getVehiclesByClassificationId error:", error)
  }
}

async function addVehicle(vehicle) {
  try {
    const sql = `INSERT INTO inventory
      (classification_id, inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color, inv_image, inv_thumbnail)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`
    const values = [
      vehicle.classification_id,
      vehicle.inv_make,
      vehicle.inv_model,
      vehicle.inv_description,
      vehicle.inv_price,
      vehicle.inv_year,
      vehicle.inv_miles,
      vehicle.inv_color,
      vehicle.inv_image,
      vehicle.inv_thumbnail
    ]
    const result = await pool.query(sql, values)
    return result.rowCount > 0
  } catch (error) {
    console.error('addVehicle error:', error)
    return false
  }
}

/* MUY IMPORTANTE: exportar todas las funciones JUNTAS al final */
module.exports = {
  getClassifications,
  getVehicleById,
  getVehiclesByClassificationId,
  addVehicle
}
