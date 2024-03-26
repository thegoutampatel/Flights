const express = require('express');

const { CityController } = require('../../controllers');
const router = express.Router(); 
const { CityMiddlewares } = require('../../middlewares');


// /api/v1/city   POST
router.post('/', 
        CityMiddlewares.validateCreateRequest,
        CityController.createCity);


module.exports = router;