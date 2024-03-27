const userController = require("../controllers/categories");
const authMiddleware = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.post(
	"/getallproductcategories",
	authMiddleware.verifyJWT,
	userController.getAllCategories,
);

module.exports = router;
