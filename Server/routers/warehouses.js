const warehouseController = require("../controllers/warehouses");
const authMiddleware = require("../middleware/auth");
const express = require("express");
const { upload3 } = require("../middleware/multer_middleware");

const router = express.Router();

router.post(
	"/getallwarehouses",
	authMiddleware.verifyJWT,
	warehouseController.getAllWarehouses,
);

router.post(
	"/addnewwarehouse",
	upload3.single("warehouse_image"),
	warehouseController.addWarehouse,
);

router.post(
	"/editwarehouse",
	upload3.single("warehouse_image"),
	warehouseController.editWarehouse,
);


router.delete(
	"/deletewarehouse",
	authMiddleware.verifyJWT,
	warehouseController.deleteWarehouse,
);

module.exports = router;
