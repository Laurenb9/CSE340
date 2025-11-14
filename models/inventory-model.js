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

/* 🔥 MUY IMPORTANTE: exportar todas las funciones JUNTAS al final */
module.exports = {
  getClassifications,
  getVehicleById,
  getVehiclesByClassificationId
}
