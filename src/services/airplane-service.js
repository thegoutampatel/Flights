const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');

const  AppError = require('../utils/errors/app-error');
//now we can add this error file and after removing the try catch in crud repo

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
   try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
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
        throw new AppError('Cannot Create an Airplane Object', StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function getAirplanes() {
    try {
     const airplanes = await airplaneRepository.getAll();
     return airplanes;
    } catch (error) {
         throw new AppError('Cannot Fetch the Data of all Airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

 async function getAirplane(id) {
    try {
     const airplane = await airplaneRepository.get(id);
     return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('the Airplane you requested is not Present', error.statusCode);
        }
        throw new AppError('Cannot Fetch the Data of Airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

 async function destroyAirplane(id) {
    try {
     const airplane = await airplaneRepository.destroy(id);
     return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('the Airplane you requested to delete is not Present', error.statusCode);
        }
        throw new AppError('Cannot Fetch the Data of Airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }

module.exports = {
    createAirplane, 
    getAirplanes,
    getAirplane,
    destroyAirplane
}