//needed Variables for ease of access
const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const specs = require('../swagger.json');

// Routes
router.use('/', require('./intro'));
router.use('/army', require('./armies'))
router.use('/unit', require('./units'));
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Ship it out
module.exports = router;