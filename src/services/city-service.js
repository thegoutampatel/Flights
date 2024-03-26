const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');

const  AppError = require('../utils/errors/app-error');
//now we can add this error file and after removing the try catch in crud repo

const cityRepository = new CityRepository();


async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city;
       } catch (error) {
            // throw error;
            //now it has only this line ok.
    
            if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                throw new AppError(explanation , StatusCodes.BAD_REQUEST);
            }
            throw new AppError('Cannot Create an City Object', StatusCodes.INTERNAL_SERVER_ERROR);
       }
}

module.exports = {
    createCity
}