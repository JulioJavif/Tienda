const express = require('express');
const { UsersController } = require('./controller')

const router = express.Router();

module.exports.UsersAPI = (app) => {

    router
        .get('/', UsersController.getUsers) // http://localhost:3000/api/products/
        .post('/', UsersController.createUser) // http://localhost:3000/api/products/
        .post('/update', UsersController.updateUser) // http://localhost:3000/api/products/update
        .put('/delete/:name', UsersController.deleteUser) // http://localhost:3000/api/products/delete/id
        .get('/:id', UsersController.getUser) // http://localhost:3000/api/products/id

    app.use('/api/users', router);
}