const { StatusCodes } = require("http-status-codes");

const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
//now i import this two function from the -> utils/common

async function createAirport(req, res) {
  try {
    // console.log(req.body);
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccessResponse.data = airport;
    //adding this line also
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

//GET --> /airports
async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

//we add the req.params.id for the id req
//GET --> /airport/:id
async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

//DELETE --> /airport/:id

async function destroyAirport(req, res) {
  try {
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data = airport;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

// UPDAETE --> /airport/:id
// i creating this update api but can't work properly later i fix This
// async function updateAirport(req, res) {
//   try {
//     // Extract airport ID from request parameters
//     const airportId = req.params.id;

//     // Extract updated data from request body
//     const updatedData = req.body;

//     // Call the service function to update the airport
//     const updatedairport = await AirportService.updateAirport(
//       airportId,
//       updatedData
//     );

//     // Send success response with the updated airport data
//     SuccessResponse.data = updatedData;

//     return res.status(StatusCodes.OK).json(SuccessResponse);
//   } catch (error) {
//     ErrorResponse.error = error;
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//   } 
// }

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport
};
