const { StatusCodes } = require('http-status-codes');

const { AirplaneService } = require('../services');

async function createAirplane(req, res) {
    try {
        console.log(req.body);
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully Create airplane',
            data: airplane, // Corrected variable name
            error: {}
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while Create airplane',
            data: {}, // There's no response data in case of error
            error: error // Pass the actual error object for debugging
        });
    }
}

module.exports = {
    createAirplane
};
