const express = require('express');
const router = express.Router();
const path = require('../controllers/intro');

router.get('/', path.intro);

module.exports = router;