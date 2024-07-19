const express = require('express');
const multiparty = require('connect-multiparty');
const userController = require('../controllers/user');
const { userAuthenticated } = require('../middleware/auth');

const mdUserImg = multiparty({ uploadDir: 'src/uploads/users' });
const app = express.Router();

app.get('/users', userController.index);
app.get('/users/:id', userAuthenticated, userController.readUser);
app.post('/users/store', mdUserImg, userController.store);
app.post('/users/auth', userController.login);
module.exports = app;