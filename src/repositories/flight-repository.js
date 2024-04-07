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
}

module.exports = FlightRepository;