const express = require("express");
const router = express.Router();

const controller = require("../controllers/locadorController");
const authController = require("../controllers/authController");

router.get("/all", controller.getAllLocadores);

router.post("/create", controller.createLocador);

router.post('/login', authController.login);

module.exports = router;