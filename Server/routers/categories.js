const categoryController = require("../controllers/categories");
const authMiddleware = require("../middleware/auth");
const express = require("express");
const { upload } = require("../middleware/multer_middleware");

const router = express.Router();

router.post(
	"/getallproductcategories",
	authMiddleware.verifyJWT,
	categoryController.getAllCategories,
);

router.post(
	"/addnewcategory",
  	upload.single('category_image'),
	categoryController.addCategory,
);

router.post(
	"/editcategory",
	upload.single("category_image"),
	categoryController.editCategory,
);

router.delete(
	"/deletecategory",
	authMiddleware.verifyJWT,
	categoryController.deleteCategory,
);

module.exports = router;
