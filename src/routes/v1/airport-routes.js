const express = require("express");

const { AirportController } = require("../../controllers");
const router = express.Router();

const { AirportMiddlewares } = require('../../middlewares');

// /api/v1/airports   POST
router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

// /api/v1/airports   GET
router.get("/", AirportController.getAirports);

// /api/v1/airports/:id   GET
router.get("/:id", AirportController.getAirport);

// /api/v1/airports/:id   DELETE
router.delete("/:id", AirportController.destroyAirport);

// /api/v1/airports/:id   PATCH
//it has some minor bugs later i resove it.
// router.patch("/:id", AirportController.updateAirplane);

module.exports = router;
