const dangerzoneController = require("../controllers/dangerzone");
const authMiddleware = require("../middleware/auth");
const express = require("express");
 

const router = express.Router();

router.delete('/resetdb', authMiddleware.verifyJWT, dangerzoneController.resetDb);
router.delete('/deletespecifictable', authMiddleware.verifyJWT, dangerzoneController.deleteSpecificTable)

module.exports = router;
