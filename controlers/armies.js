const db_client = require('../models/db_connection');
const url = require('url');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const express = require('express');
const { ObjectId } = require('mongodb');
const app = express();
const objectId = require('mongodb').ObjectId;
const mongodb = require('mongodb');
const router = express.Router();

//Actions
const getAll = async (req, res)=>
    {const result = await db_client.getDb().db().collection('armies').find(); //this goes into database and pulls everything out
    result.toArray().then((data) => {   //this takes everything and turns it from a JSON to an array
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
});
};

//export statement
module.exports = {getAll};