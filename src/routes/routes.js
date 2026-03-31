const express = require('express');
const router = express.Router();
const { viewHome, viewLogin, viewRegister, viewDashboard, newCard, login, register, logout, updateCard, deleteCard, updateList, deleteList, updateBoard, deleteBoard } = require('../controllers/controllers.js');
const { verifyToken } = require('../middlewares/tokenVerifier.js');

router.get('/', viewHome);

router.get('/login', viewLogin);

router.get('/register', viewRegister);

router.get('/dashboard', verifyToken, viewDashboard);

router.get('/logout', logout);

router.post('/api/auth/login', login);

router.post('/api/auth/register', register);

router.post('/api/newcard', verifyToken, newCard);

router.put('/api/card/:id', verifyToken, updateCard);

router.put('/api/list/:id', verifyToken, updateList);

router.put('/api/board/:id', verifyToken, updateBoard);

router.delete('/api/card/:id', verifyToken, deleteCard);

router.delete('/api/list/:id', verifyToken, deleteList);

router.delete('/api/board/:id', verifyToken, deleteBoard);

module.exports = router;