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
const dbName = "crusade";
const colName = "units"

//Actions
//get all
const getAll = async (req, res)=>
    {const result = await db_client.getDb().db(dbName).collection(colName).find(); //this goes into database and pulls everything out
    result.toArray().then((data) => {   //this takes everything and turns it from a JSON to an array
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
});
};
// search up one
const getSearch = async (req,res)=>
{
  const query = new objectId(req.params.id);;
  console.log(query);
  const result = await db_client.getDb().db(dbName).collection(colName).find({id: query});
  result.toArray().then((data) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
});
};

// put a new unit in an army
const postNew = async (req,res) =>
{
  const army = {
    name: req.body.Name,
    type: req.body.army_logo,
    xp: req.body.RP,
    battle_honors: req.body.battle_honors,
    battle_scars: req.body.battle_scars,
    army_id: req.body.army_id
  };
  
  const result = await db_client.getDb().db(dbName).collection(colName).insertOne(army, true)
    res.send({id: result.insertedId});
};
//export statement
module.exports = {getAll, getSearch, postNew};