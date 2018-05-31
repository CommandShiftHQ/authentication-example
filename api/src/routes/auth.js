const express = require('express');
const AuthController = require('../controllers/auth');

const router = express.Router();

router.post('/login', AuthController.login)
      .post('/github', AuthController.github);

module.exports = router;
