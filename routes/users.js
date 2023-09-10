var express = require("express");
var router = express.Router();
require("express-group-router");
const authentication= require("../middleware/authenticate")
const AUTH_CONTROLLER = require("../auth/controller/auth.controller");
const EMPLOYEE_CONTROLLER = require("../employee/controller/employee.controller");

/* get users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/**
 * Routes for Authentication
 */
router.post("/add", AUTH_CONTROLLER.add);
router.post("/login", AUTH_CONTROLLER.login);

/**
 * Routes for Employees
 */
router.post("/add-employee", authentication,EMPLOYEE_CONTROLLER.add);
router.get("/get-employee",authentication,authentication, EMPLOYEE_CONTROLLER.get);
router.delete("/delete-employee/:id", authentication,EMPLOYEE_CONTROLLER.delete);
router.put("/update-employee/:id", authentication,EMPLOYEE_CONTROLLER.update);

module.exports = router;
