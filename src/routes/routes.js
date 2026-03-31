const express = require('express');
const router = express.Router();
const { viewHome, viewLogin, viewRegister, viewDashboard, newCard, login, register } = require('../controllers/controllers.js');

router.get('/', viewHome);

router.get('/login', viewLogin);

router.get('/register', viewRegister);

router.get('/dashboard', viewDashboard);

router.post('/api/newcard', newCard);

router.post('/api/auth/login', login);

router.post('/api/auth/register', register);

module.exports = router;