const express = require('express');
const router = express.Router();
const path = require('../controlers/intro');

router.get('/', path.intro);

module.exports = router;