const createError = require('http-errors');
const debug = require('debug')('app:module-sales-controller');
const { SalesServices } = require('./services');
const { Response } = require('../common/response');

module.exports.SalesController = {

    getAllSales: async (req, res) => {
        try {
            let sales = await SalesServices.getAllSales();
            //debug('Sales:\n' + sales);
            Response.success(res, 200, 'Lista de ventas', sales);
        } catch (error) {
            //debug(error);
            Response.error(res, error);
        }
    },

    getSaleByRef: async (req, res) => {
        try {
            const ref = req.params.ref;
            let sale = await SalesServices.getSaleByRef(ref);
            if (!sale) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Referencia de venta: ${ref}`, sale);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },

    getSalesOf: async (req, res) => {
        try {
            const id = req.params.id;
            debug(id);
            const sales = await SalesServices.getSalesOf(id);
            //debug(sales);
            if (!sales) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `compras del usuario ${id}`, sales);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },

    createSale: async (req, res) => {
        const { ProductsServices } = require('../products/services');
        try {
            const body = req.body;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                debug(body);
                let venta = await ProductsServices.saleProduct(body.productId, body.amount);
                debug(venta);
                let finalSale = {
                    "productId": venta.id,
                    "amount": body.amount,
                    "clientId": body.clientId,
                    "total": body.amount * venta.precio
                }
                let result = await SalesServices.createSale(finalSale);
                Response.success(res, 200, `Compra realizada con id:${result}`, finalSale);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    }


}