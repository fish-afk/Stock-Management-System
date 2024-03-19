const userController = require("../controllers/users");
const authMiddleware = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.post('/getallusers', authMiddleware.verifyJWT, userController.getAllUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refresh", userController.refresh);
router.post("/confirmjwt", authMiddleware.confirmJWT);
router.post('/deleteuser', authMiddleware.verifyJWT, userController.deleteUser)
router.patch('/edituserrole', authMiddleware.verifyJWT, userController.editUserRole)

module.exports = router;
