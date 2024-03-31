const supplierController = require("../controllers/suppliers");
const authMiddleware = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.post(
	"/getallsuppliers",
	authMiddleware.verifyJWT,
	supplierController.getAllSuppliers,
);

router.post(
	"/addnewsupplier",
	authMiddleware.verifyJWT,
	supplierController.addSupplier,
);

router.patch(
	"/editsupplier",
	authMiddleware.verifyJWT,
	supplierController.editSupplier,
);

router.delete(
	"/deletesupplier",
	authMiddleware.verifyJWT,
	supplierController.deleteSupplier,
);

module.exports = router;
