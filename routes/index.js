//needed Variables for ease of access
const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const specs = require('../swagger.json');

// Routes
router.use('/', require('./intro'));
router.use('/random', require('./random'))
router.use('/contacts', require('./contacts'));
router.use('/search', require('./search'));
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Ship it out
module.exports = router;