const CrudRepository = require('./crud-repository');
const { Flight, Airplane } = require('../models');
//For the Airplane Details we need to Import this Airplane Model.



class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter, sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [{ model: Airplane }]    // Include Airplane model to fetch airplane details
        });
        return response;
    }

    async updateRemainingSeats(flightId, seats, dec = true){
        
        const flight = await Flight.findByPk(flightId);
        
        if(+dec){
            await flight.decrement('totalSeats', {by: seats});
        }else{
            await flight.increment('totalSeats', {by: seats});
        }
        await flight.save();
        return flight;
    }
}

module.exports = FlightRepository;