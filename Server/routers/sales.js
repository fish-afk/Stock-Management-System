const salesController = require("../controllers/sales");
const authMiddleware = require("../middleware/auth");
const express = require("express");
const { upload1 } = require("../middleware/multer_middleware");

const router = express.Router();

router.post(
	"/getallsales",
	authMiddleware.verifyJWT,
	salesController.getAllSales,
);

router.post(
	"/addnewsale",
	upload1.single("sale_image"),
	salesController.addSale,
);

router.post(
	"/editsale",
	upload1.single("sale_image"),
	salesController.editSale,
);

router.delete(
	"/deletesale",
	authMiddleware.verifyJWT,
	salesController.deleteSale,
);

module.exports = router;
