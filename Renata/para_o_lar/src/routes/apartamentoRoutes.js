const express = require("express");
const router = express.Router();

const controller = require("../controllers/apartamentoController");
// const authController = require("../controllers/authController");

router.get("/all", controller.getAllApartamentos);

router.post("/create", controller.createApartamento);

// router.post('/login', authController.login);

module.exports = router;