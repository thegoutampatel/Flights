const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");

const AppError = require("../utils/errors/app-error");
//now we can add this error file and after removing the try catch in crud repo

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {

    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    // throw error;
    //now it has only this line ok.

    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot Create an Flight Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
};
