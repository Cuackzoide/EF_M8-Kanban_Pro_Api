const express = require('express');
const router = express.Router();
const { viewHome, viewLogin, viewRegister, viewDashboard, newBoard, newCard, login, register, logout, updateCard, deleteCard, updateBoard, deleteBoard } = require('../controllers/controllers.js');
const { verifyToken } = require('../middlewares/tokenVerifier.js');

router.get('/', viewHome);

router.get('/login', viewLogin);

router.get('/register', viewRegister);

router.get('/dashboard', verifyToken, viewDashboard);

router.get('/logout', logout);

router.post('/api/auth/login', login);

router.post('/api/auth/register', register);

router.post('/api/board', verifyToken, newBoard);

router.post('/api/newcard', verifyToken, newCard);

router.put('/api/card/:id', verifyToken, updateCard);

router.put('/api/board/:id', verifyToken, updateBoard);

router.delete('/api/card/:id', verifyToken, deleteCard);

router.delete('/api/board/:id', verifyToken, deleteBoard);

module.exports = router;