const express = require('express');
const router = express.Router();
const ApiController = require('../controllers/ApiController');

router.get('/users', ApiController.getAllUsers);
router.get('/users/:id', ApiController.getUser);
router.post('/users', ApiController.createUser);

router.post('/login', ApiController.checkLogin);

module.exports = router;