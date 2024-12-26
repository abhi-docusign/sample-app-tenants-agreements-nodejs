const express = require('express');
const router = express.Router();
const {
  createController
} = require('../controllers/viewDocumentsController');

router.post('/', createController);

module.exports = router;
