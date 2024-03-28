const userController = require("../controllers/categories");
const authMiddleware = require("../middleware/auth");
const express = require("express");
const { upload } = require("../middleware/multer_middleware");

const router = express.Router();

router.post(
	"/getallproductcategories",
	authMiddleware.verifyJWT,
	userController.getAllCategories,
);

router.post(
	"/addnewcategory",
  	upload.single('category_image'),
	userController.addCategory,
);


router.post(
	"/deletecategory",
	authMiddleware.verifyJWT,
	userController.deleteCategory,
);

module.exports = router;
