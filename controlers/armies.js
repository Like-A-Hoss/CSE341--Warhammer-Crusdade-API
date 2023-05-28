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


//variables to control DB and DB Access
const dbName = "crusade";
const colName = "armies"

//Actions
//get all content
const getAll = async (req, res)=>
    {const result = await db_client.getDb().db(dbName).collection(colName).find(); //this goes into database and pulls everything out
    result.toArray().then((data) => {   //this takes everything and turns it from a JSON to an array
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
});
};
//get a specific army
const getSearch = async (req,res)=>
{
  const query = new objectId(req.params.id);
  console.log(query);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }else{
    console.log('Passed Validation, Proceeding');
  }

  const result = await db_client.getDb().db(dbName).collection(colName).find({id: query});
  result.toArray().then((data) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
});
};
// Post a new army
const postNew = async (req,res) =>
{
  const army = {
    Name: req.body.Name,
    army_logo: req.body.army_logo,
    faction: req.body.faction,
    RP: req.body.RP,
    size: req.body.size,
    user_email: req.body.user_email
  };
  
  const result = await db_client.getDb().db(dbName).collection(colName).insertOne(army, true)
    res.send({id: result.insertedId});
};

//update Resource Points
const updateRp = async(req,res) =>
{
  const query = new objectId(req.params.id);
  const updateField = req.body.updateField;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const result = await db_client.getDb().db(dbName).collection(colName).updateOne(
    {_id:query},
    { $set:{RP: updateField}},
    {upsert:true}
    );
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const updateSize = async(req,res) =>
{
  const query = new objectId(req.params.id);
  const updateField = req.body.updateField;
  const result = await db_client.getDb().db(dbName).collection(colName).updateOne(
    {_id:query},
    { $set:{size: updateField}},
    {upsert:true}
    );
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
};

const updateLogo = async(req,res) =>
{
  const query = new objectId(req.params.id);
  const updateField = req.body.updateField;
  const result = await db_client.getDb().db(dbName).collection(colName).updateOne(
    {_id:query},
    { $set:{army_logo: updateField}},
    {upsert:true}
    );
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
};
// Delete Statement
const remove = async (req,res) =>
{
  const query = new objectId(req.params.id);
  console.log(query);
  const response = await db_client.getDb().db(dbName).collection(colName).deleteOne({_id: query}); 
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    }else {
      res.status(500).json(response.error || 'An unknown error occured while attempting to delete contact.');
    }
};
//export statement
module.exports = {getAll, getSearch, postNew, updateRp, updateSize, updateLogo, remove};