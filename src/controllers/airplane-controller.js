const { StatusCodes } = require('http-status-codes');

const { AirplaneService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
//now i import this two function from the -> utils/common

async function createAirplane(req, res) {
    try {
        // console.log(req.body);
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

//DELETE --> /airplanes/:id 

async function destroyAirplane(req , res) {
    try {   
        const airplanes = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data = airplanes;

        return res.status(StatusCodes.OK).json( SuccessResponse ); 
          
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json( ErrorResponse );
       
    }
}

// UPDAETE --> /airplane/:id
// i creating this update api but can't work properly later i fix This
async function updateAirplane(req, res) {
    try {
        // Extract airplane ID from request parameters
        const airplaneId = req.params.id;
        
        // Extract updated data from request body
        const updatedData = req.body;

        // Call the service function to update the airplane
        const updatedAirplane = await AirplaneService.updateAirplane(airplaneId, updatedData);

        // Send success response with the updated airplane data
        SuccessResponse.data = updatedAirplane;
        
        return res.status(StatusCodes.OK).json(SuccessResponse);
          
    } catch (error) {
                  
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json( ErrorResponse );
    }
}



module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
};
