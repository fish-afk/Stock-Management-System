const statsController = require("../controllers/stats");
const authMiddleware = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.post('/getinventorystats', authMiddleware.verifyJWT, statsController.getInventoryStats);
router.post('/getcategorystats', authMiddleware.verifyJWT, statsController.getCategoryStats)
module.exports = router;

