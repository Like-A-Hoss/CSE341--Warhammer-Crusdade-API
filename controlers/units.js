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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
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
// Update Functions
const updatexp = async(req,res) =>
{
  const query = new objectId(req.params.id);
  const updateField = req.body.update;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  console.log(req.body.update)
  console.log(updateField);
  const result = await db_client.getDb().db(dbName).collection(colName).updateOne(
    {_id:query},
    { $set:{xp: updateField}},
    {upsert:true}
    );
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      
      res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
};
const updateBattleHonors = async(req,res) =>
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
    { $push:{battle_honors: updateField}},
    {upsert:true}
    );
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
};
const updateBattleScars = async(req,res) =>
{
  const query = new objectId(req.params.id);
  const updateField = req.body.updateField;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
//Perform the CRUD operation
  const result = await db_client.getDb().db(dbName).collection(colName).updateOne(
    {_id:query},
    { $push:{battle_scars: updateField}},
    {upsert:true}
    );
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
};
// Delete Function
const remove = async (req,res) =>
{
  const query = new objectId(req.params.id);
  console.log(query);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const response = await db_client.getDb().db(dbName).collection(colName).deleteOne({_id: query}); 
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    }else {
      res.status(500).json(response.error || 'An unknown error occured while attempting to delete contact.');
    }
};
//export statement
module.exports = {getAll, getSearch, postNew, updateBattleHonors, updateBattleScars, updatexp, remove};