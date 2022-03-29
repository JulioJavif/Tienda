const express = require('express');
const { ProductsController } = require('./controller')

const router = express.Router();

module.exports.ProductsAPI = (app) => {

    router
        .get('/', ProductsController.getProducts) // http://localhost:3000/api/products/
        .get('/report', ProductsController.generateReport) // http://localhost:3000/api/products/report
        .post('/', ProductsController.createProduct) // http://localhost:3000/api/products/
        .post('/update', ProductsController.updateProduct) // http://localhost:3000/api/products/update
        .put('/delete/:name', ProductsController.deleteProduct) // http://localhost:3000/api/products/delete/id
        .get('/:id', ProductsController.getProduct) // http://localhost:3000/api/products/id

    app.use('/api/products', router);
}