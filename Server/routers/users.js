const userController = require("../controllers/users");
const authMiddleware = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.post('/getallusers', authMiddleware.verifyJWT, userController.getAllUsers);
router.post("/register",authMiddleware.verifyJWT, userController.register);
router.post("/login", userController.login);
router.post("/refresh", userController.refresh);
router.post("/confirmjwt", authMiddleware.confirmJWT);
router.delete('/deleteuser', authMiddleware.verifyJWT, userController.deleteUser)
router.patch('/edituserrole', authMiddleware.verifyJWT, userController.editUserRole)
router.patch('/editprofile', authMiddleware.verifyJWT, userController.EditProfile);
router.patch('/changepassword', authMiddleware.verifyJWT, userController.changePassword)

module.exports = router;
