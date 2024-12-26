const express = require('express');
const router = express.Router();
const {
  createController
} = require('../controllers/sendAgreementsController');

router.post('/', createController);

module.exports = router;
