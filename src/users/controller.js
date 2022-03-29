const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');
const { UsersServices } = require('./services');
const { Response } = require('../common/response');

module.exports.UsersController = {

    getUsers: async (req, res) => {
        try {
            let users = await UsersServices.getAll();
            Response.success(res, 200, 'Lista de Usuarios', users);
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },

    getUser: async (req, res) => {
        try {
            const { params: {id}} = req;
            let user = await UsersServices.getById(id);
            if(!user){
                Response.error(res, new createError.NotFound())
            }else{
                Response.success(res, 200, `Usuario ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            }else{
                const insertedId = await UsersServices.create(body);
                Response.success(res, 200, 'Usuario agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    
    updateUser: async (req, res) => {
        try {
            const { body } = req;
            //debug(body);
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                //debug(body);
                const updateId = await UsersServices.updateUser(body);
                //debug(updateId);
                Response.success(res, 200, 'Usuario actualizado', updateId);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    
    deleteUser: async (req, res) => {
        try {
            const name = req.params.name;
            if (!name || name === "") {
                Response.error(res, new createError.BadRequest());
            }else{
                const deleteObj = await UsersServices.deleteUser(name);
                debug(deleteObj);
                Response.success(res, 200, "Usuario eliminado", deleteObj);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    }
}