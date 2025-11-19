const utilities = require("../utilities/")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  const nav = await utilities.getNav() // <-- aquí se crea nav
  res.render("account/login", {
    title: "Login",// <-- aquí se envía nav
  })
}

module.exports = { buildLogin }

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null
  })
}

module.exports = { buildLogin, buildRegister }