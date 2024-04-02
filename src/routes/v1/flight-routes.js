const express = require("express");

const { FlightController } = require("../../controllers");
const router = express.Router();

const { FlightMiddlewares } = require('../../middlewares');

// /api/v1/flights   POST
router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);
   
// /api/v1/flights?trips=MUM-DEL   Get
router.get(
  "/",
 FlightController.getAllFlights
);

module.exports = router;