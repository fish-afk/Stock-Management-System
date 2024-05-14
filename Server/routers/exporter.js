const exporterController = require("../controllers/exporter");
const authMiddleware = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.post('/exportsystemdata', authMiddleware.verifyJWT, exporterController.exporter);

module.exports = router;

