const purchasesController = require("../controllers/purchases");
const authMiddleware = require("../middleware/auth");
const express = require("express");
const { upload2 } = require("../middleware/multer_middleware");

const router = express.Router();

router.post(
	"/getallpurchases",
	authMiddleware.verifyJWT,
	purchasesController.getAllPurchases,
);

router.post(
	"/addnewpurchase",
	upload2.single("purchase_image"),
	purchasesController.addPurchase,
);

router.post(
	"/editpurchase",
	upload2.single("purchase_image"),
	purchasesController.editPurchase,
);

router.delete(
	"/deletepurchase",
	authMiddleware.verifyJWT,
	purchasesController.deletePurchase,
);

module.exports = router;
