const { Logger } = require('../config');

class CrudRepository{
    constructor(model) {
        this.model = model;
    }


    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.error('Something Went wrong in the Crud Repo : Create');
            throw error;
        }
    }

    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return response;
        } catch (error) {
            Logger.error('Something Went wrong in the Crud Repo : Destroy');
            throw error;
        }
    }

    async get(data) {
        try {
            const response = await this.model.findbyPK(data);
            return response;
        } catch (error) {
            Logger.error('Something Went wrong in the Crud Repo : get');
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error('Something Went wrong in the Crud Repo : getAll');
            throw error;
        }
    }

    async update(id, data) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return response;
        } catch (error) {
            Logger.error('Something Went wrong in the Crud Repo : update');
            throw error;
        }
    }
}

module.exports = CrudRepository;