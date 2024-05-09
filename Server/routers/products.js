const productsController = require("../controllers/products");
const authMiddleware = require("../middleware/auth");
const express = require("express");
const { upload4 } = require("../middleware/multer_middleware");

const router = express.Router();

router.post(
	"/getallproducts",
	authMiddleware.verifyJWT,
	productsController.getAllProducts,
);

router.post(
	"/addnewproduct",
	upload4.single("product_image"),
	productsController.addProduct,
);

router.post(
	"/editproduct",
	upload4.single("product_image"),
	productsController.editProduct,
);

router.delete(
	"/deleteproduct",
	authMiddleware.verifyJWT,
	productsController.deleteProduct,
);

module.exports = router;
