const express = require('express');
const app = express();
const temp_port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
require('dotenv/config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json()).use((req, res, next) =>{res.setHeader('access-controll-allow-origin', '*'); next();}).use('/', require('./routes'));

// This is where the action happens
console.log('starting DB Connection');
const client = require('./models/db_connection');
console.log('initializing DB');
client.initDb((err) => {if (err) {console.log(err)} else {app.listen(temp_port);
    console.log('Web Server is listening at port '+ (temp_port));}});
