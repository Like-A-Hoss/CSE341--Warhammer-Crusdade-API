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
const validator = require('../middleware/id_validate')


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
  //Searching
  const query = new objectId(req.params.id);
  console.log(query);
  const result = await db_client.getDb().db(dbName).collection(colName).find({id: query});
  result.toArray().then((data) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
});
}

// Post a new army
const postNew = async (req,res) =>
{
  try {
    const { name, faction, rp, size, user_email } = req.body;
    //Validating
    if(!name || !faction || !rp || !size || !user_email){
      return res.status(400).json({error: 'Invalid Input: Name, Faction, RP, Size, or User E-Mail'});
    }
  //create constants
  const $name = req.body.Name;
  const $army_logo = req.body.army_logo;
  const $faction = req.body.faction;
  const $rp= req.body.RP;
  const $size = req.body.size;
  const $email = req.body.user_email
 
  // Preping Army to post
  const army = {
    Name: $name,
    army_logo: $army_logo,
    faction: $faction,
    RP: $rp,
    size: $size,
    user_email: $email
  };
  //Posting to Database
  const result = await db_client.getDb().db(dbName).collection(colName).insertOne(army, true)
    res.send({id: result.insertedId});
  } catch (error) {
    console.error('Error Creating a new army:', error);
    res.status(500).send('An Error occurred while creating your new army.  Please check your inputs and try again');
  }
  };

//update Resource Points
const updateRp = async(req,res) =>
{
  try {
    const { id } = req.params;
    const { update } = req.body;

    // Check if the 'update' field exists and is an integer
    if (typeof update === 'undefined' || !Number.isInteger(update)) {
      return res.status(400).json({ error: 'Invalid input: Update field must be set and contain an integer.' });
    }
    const query = new objectId(req.params.id);
    const updateField = req.body.updateField;
   
  
    const result = await db_client.getDb().db(dbName).collection(colName).updateOne(
      {_id:query},
      { $set:{RP: updateField}},
      {upsert:true}
      );
      if (result.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(result.error || 'Some error occurred while updating the contact.');
      }
  } catch (error) {
    console.error('Error updating army:', error);
    res.status(500).send('An Error occurred while updating your army.  Please check your inputs and try again');
  }
 
};

const updateSize = async(req,res) =>
{
  try{
    const { id } = req.params;
    const { update } = req.body;

    // Check if the 'update' field exists and is an integer
    if (typeof update === 'undefined' || !Number.isInteger(update)) {
      return res.status(400).json({ error: 'Invalid input: Update field must be set and contain an integer.' });
    }
  
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
}catch(error){
  console.error('Error updating renown points:', error);
    res.status(500).send('An error occurred while updating Army Size.');
}
};

const updateLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const { logoUrl } = req.body;

    // Check if the 'logoUrl' field exists and is a non-empty string
    if (!logoUrl || typeof logoUrl !== 'string' || logoUrl.trim() === '') {
      return res.status(400).json({ error: 'Invalid input: Logo URL must be provided as a non-empty string.' });
    }

    // Check if the 'logoUrl' ends with a supported image extension
    const supportedExtensions = ['.jpg', '.gif', '.bmp', '.png'];
    const isValidExtension = supportedExtensions.some(ext => logoUrl.toLowerCase().endsWith(ext));
    if (!isValidExtension) {
      return res.status(400).json({ error: 'Invalid input: Logo URL must end with a supported image extension (jpg, gif, bmp, png).' });
    }

    const query = new objectId(id);
    const updateField = logoUrl;

    const result = await db_client
      .getDb()
      .db(dbName)
      .collection(colName)
      .updateOne({ _id: query }, { $set: { army_logo: updateField } }, { upsert: true });

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while updating your army\'s Logo.');
    }
  } catch (error) {
    console.error('Error updating logo URL:', error);
    res.status(500).send('An error occurred while updating the logo URL.');
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