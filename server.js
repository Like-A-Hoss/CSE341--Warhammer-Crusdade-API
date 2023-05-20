const express = require('express');
const app = express();

console.log('starting DB Connection');
const client = require('./models/db_connection');
console.log('initializing DB');
client.initDb((err) => {if (err) {console.log(err)} else {app.listen(temp_port);
    console.log('Web Server is listening at port '+ (temp_port));}});