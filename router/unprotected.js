const express = require('express');
const unprotectedRoutes = express.Router();
const UserController = require('../controllers/user.controller');


unprotectedRoutes.get('/', UserController.createToken);


module.exports = unprotectedRoutes;
