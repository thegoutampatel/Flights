const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');

const  AppError = require('../utils/errors/app-error');
//now we can add this error file and after removing the try catch in crud repo

const airportRepository = new AirportRepository();

async function createAirport(data) {
   try {
    const airport = await airportRepository.create(data);
    return airport;
   } catch (error) {
        // throw error;
        //now it has only this line ok.

        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot Create an airport Object', StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function getAirports() {
    try {
     const airports = await airportRepository.getAll();
     return airports;
    } catch (error) {
         throw new AppError('Cannot Fetch the Data of all airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

 async function getAirport(id) {
    try {
     const airport = await airportRepository.get(id);
     return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('the airport you requested is not Present', error.statusCode);
        }
        throw new AppError('Cannot Fetch the Data of airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

 async function destroyAirport(id) {
    try {
     const airport = await airportRepository.destroy(id);
     return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('the airport you requested to delete is not Present', error.statusCode);
        }
        throw new AppError('Cannot Fetch the Data of airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

 // Having some Bugs. Later i fix it.
 async function updateAirport(id, data) {
    try {
        // Call the service function to update the airport
        const updatedAirport = await airportRepository.updateAirport(id, data);

        // Return the updated airport data
        return updatedAirport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Airport you requested to update is not present', error.statusCode);
        }
        throw new AppError('Cannot update the Airport data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createAirport, 
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}