const createError = require('http-errors');
const debug = require('debug')('app:module-products-controller');
const { ProductsServices } = require('./services');
const { Response } = require('../common/response');

module.exports.ProductsController = {

    getProducts: async (req, res) => {
        try {
            let products = await ProductsServices.getAll();
            Response.success(res, 200, 'Lista de productos', products);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    getProduct: async (req, res) => {
        try {
            const { params: {id}} = req;
            let product = await ProductsServices.getById(id);
            if(!product){
                Response.error(res, new createError.NotFound())
            }else{
                Response.success(res, 200, `Producto ${id}`, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            }else{
                const insertedId = await ProductsServices.create(body);
                Response.success(res, 200, 'Producto agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    
    updateProduct: async (req, res) => {
        try {
            const { body } = req;
            //debug(body);
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const updateId = await ProductsServices.updateProduct(body);
                debug(updateId);
                Response.success(res, 200, 'Producto actualizado', updateId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    
    deleteProduct: async (req, res) => {
        try {
            const name = req.params.name;
            if (!name || name === "") {
                Response.error(res, new createError.BadRequest());
            }else{
                const deleteObj = await ProductsServices.deleteProduct(name);
                debug(deleteObj);
                Response.success(res, 200, "Producto eliminado", deleteObj);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    
    generateReport: async (req, res) => {
        try {
            ProductsServices.generateReport('Inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
}