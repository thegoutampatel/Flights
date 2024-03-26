const { StatusCodes } = require('http-status-codes');

const { AirplaneService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
//now i import this two function from the -> utils/common

async function createAirplane(req, res) {
    try {
        console.log(req.body);
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
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

//GET --> /airplanes
async function getAirplanes(req , res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;

        return res.status(StatusCodes.OK).json( SuccessResponse ); 
          
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json( ErrorResponse );
       
    }
}

//we add the req.params.id for the id req
//GET --> /airplanes/:id
async function getAirplane(req , res) {
    try {   
        const airplanes = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplanes;

        return res.status(StatusCodes.OK).json( SuccessResponse ); 
          
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json( ErrorResponse );
       
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
};
