const productsController = require("../controllers/products");
const authMiddleware = require("../middleware/auth");
const express = require("express");
const { upload } = require("../middleware/multer_middleware");

const router = express.Router();

router.post(
	"/getallproducts",
	authMiddleware.verifyJWT,
	productsController.getAllProducts,
);

router.post(
	"/addnewproduct",
	upload.single("product_image"),
	productsController.addProduct,
);

router.post(
	"/editproduct",
	upload.single("product_image"),
	productsController.editProduct,
);

router.delete(
	"/deleteproduct",
	authMiddleware.verifyJWT,
	productsController.deleteProduct,
);

module.exports = router;
