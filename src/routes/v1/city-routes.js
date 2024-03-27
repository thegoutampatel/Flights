const express = require("express");

const { CityController } = require("../../controllers");
const router = express.Router();
const { CityMiddlewares } = require("../../middlewares");

// /api/v1/city   POST
router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);

// /api/v1/city   GET
router.get('/', CityController.getCities);

// /api/v1/cities/:id   GET
router.get('/:id', CityController.getCity);

// /api/v1/city/:id   DELETE
router.delete('/:id', CityController.destroyCity);

// /api/v1/city/:id   PATCH
//it has some minor bugs later i resove it.
// router.patch('/:id', AirplaneController.updateAirplane);

module.exports = router;
