const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const {Op} = require('sequelize');
//require the operators from the Sequelize to implement the filters/Query.
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

async function getAllFlights(query){
  let customFilter = {};
  let sortFilter = [];
  
  //trips = MUM- DEL
  if(query.trips){
    [departureAirportId, arrivalAirportId] = query.trips.split("-");

    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;

    //ToDO : Check the arrival and departure airport are not same
  }

  if (query.price) {
    // console.log("Query Price:", query.price); // Log the query price
    const [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000 : maxPrice)]
    };
  }

  if (query.travellers) {
    customFilter.totalSeats = { 
      [Op.gte]: query.travellers
    };
  }

  if (query.tripDate) {
    const startDate = new Date(query.tripDate);
    const endDate = new Date(new Date(query.tripDate).setHours(23, 59, 59, 999)); 
    // Set end time to 23:59:59.999 to cover the entire day
    
    customFilter.departureTime = {
      [Op.between]: [startDate, endDate]
    };
  }

  if(query.sort){
    const params = query.sort.split(',');
    const sortFilters = params.map((param) => param.split('_'));
    sortFilter = sortFilters             
  }


  try {
    const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
    return flights;
    
  } catch (error) {
    throw new AppError('Cannot Fetch the Data of all Flights', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getFlight(id) {
  try {
   const flight = await flightRepository.get(id);
   return flight;
  } catch (error) {
      if(error.statusCode == StatusCodes.NOT_FOUND){
          throw new AppError('the flight you requested is not Present', error.statusCode);
      }
      throw new AppError('Cannot Fetch the Data of flight', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateSeats(data){
 try {
    const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
    return response;
  
 } catch(error) {
  console.log(error);
    throw new AppError('Cannot update the Data of flight', StatusCodes.INTERNAL_SERVER_ERROR);
 }
}
module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
};
