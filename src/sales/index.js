const express = require('express');
const { SalesController } = require('./controller');

const router = express.Router();

/*
salesObject
{
    productId: "",
    userId: ""
    amount: ""
}

*/

module.exports.SalesAPI = (app) => {
    router
    .get('/', SalesController.getAllSales) // http://localhost:3000/api/sales
    .post('/', SalesController.createSale) //http://localhost:3000/api/sales
    .get('/user/:id', SalesController.getSalesOf) // http://localhost:3000/api/sales/user/
    .get('/:ref', SalesController.getSaleByRef); // http://localhost:3000/api/sales
    

    app.use('/api/sales', router);
};