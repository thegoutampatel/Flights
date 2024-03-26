const { StatusCodes } = require('http-status-codes');

const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
//now i import this two function from the -> utils/common



async function createCity(req, res) {
    try {
        // console.log(req.body);
        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessResponse.data = city;
        //adding this line also        
        return res.status(StatusCodes.CREATED).json( SuccessResponse );
        // {
        //     success: true,
        //     message: 'Successfully Create airplane',
        //     data: airplane, // Corrected variable name
        //     error: {}
        // }
        // removing from the response json 

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json( ErrorResponse );
        // {
        //     success: false,
        //     message: 'Something went wrong while Create airplane',
        //     data: {}, // There's no response data in case of error
        //     error: error // Pass the actual error object for debugging
        // }
        // removing from the response json 
    }
}

module.exports = {
    createCity
}