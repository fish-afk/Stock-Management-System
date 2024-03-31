const customerController = require("../controllers/customers");
const authMiddleware = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.post(
	"/getallcustomers",
	authMiddleware.verifyJWT,
	customerController.getAllCustomers,
);

router.post(
	"/addnewcustomer",
	authMiddleware.verifyJWT,
	customerController.addCustomer,
);

router.patch(
	"/editcustomer",
	authMiddleware.verifyJWT,
	customerController.editCustomer,
);

router.delete(
	"/deletecustomer",
	authMiddleware.verifyJWT,
	customerController.deleteCustomer
);

module.exports = router;
