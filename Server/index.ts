import { Express ,Request,Response } from "express";
import { Model } from "mongoose";
import {Clinic} from "./models/ClinicModel"

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const clinicsModel:Model<Clinic> = require('./models/ClinicModel');


const app:Express = express();
const Port = process.env.PORT || 4000;
const mongo_uri = process.env.MONGO_URI;


app.use(cors());
app.use(express.json());



mongoose.set('strictQuery', true);

mongoose                                  //mongosose connetion 
  .connect(mongo_uri)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(`at mongoose connect: ${err.message}`);
  });



  app.get('/getClinics',async (req,res)=>{
    const query = await clinicsModel.find();
    res.status(200).json(query);
    
  });

app.listen(Port,()=>{
    console.log(`server running on port ${Port}`);
});

