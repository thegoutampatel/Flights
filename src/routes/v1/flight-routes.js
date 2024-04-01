const express = require("express");

const { FlightController } = require("../../controllers");
const router = express.Router();

const { FlightMiddlewares } = require('../../middlewares');

// /api/v1/airports   POST
router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);

module.exports = router;