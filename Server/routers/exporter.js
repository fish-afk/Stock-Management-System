const exporterController = require("../controllers/exporter");
const authMiddleware = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.post(
	"/exportsystemdata",
	authMiddleware.verifyJWT,
	exporterController.SystemDataExporter,
);

router.post(
	"/exportinventorydata",
	authMiddleware.verifyJWT,
	exporterController.InventoryDataExporter,
);

module.exports = router;
