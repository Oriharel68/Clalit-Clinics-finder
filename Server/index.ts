import { Express ,Request,Response } from "express";
import { Model } from "mongoose";
import {Clinic} from "./models/ClinicModel"
import {User} from './models/UsersModel'
import {generateSecret,totp} from 'speakeasy'


const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const clinicsModel:Model<Clinic> = require('./models/ClinicModel');
const UsersModel:Model<User> = require('./models/UsersModel');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

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
    try {
      const query = await clinicsModel.find();
      return res.status(200).json(query);
    } catch (error) {
      return res.status(500).send(error);
    }
    
    
  });

  app.post('/register',async (req:Request,res:Response)=>{
    try {
    const {UserName} = req.body;
    if(!UserName)return res.status(400).send('missing info');
    const Secret = speakeasy.generateSecret({name:`Clinic-finder:${UserName}`,length:20,issuer:'Clalit Darom'});
    const userDB = new UsersModel<User>({secret:Secret.hex,UserName})
    await userDB.save();
    qrcode.toDataURL(Secret.otpauth_url,(err,imgUrl)=>{
      if(err)return res.status(500).send("Failed to generate QrCode")
      return res.status(200).send(`<img src=${imgUrl}>`);
    })
    } catch (error) {
      return res.status(500).send(error);
    }

  })

  app.post('/login',async (req:Request,res:Response)=>{
    try {
    const {UserName,token} = req.body;
    const User = await UsersModel.findOne({UserName:UserName});
    if(!User)return res.status(401).send('login failed');
    const {secret} = User;
    const Validate = totp.verify({secret,encoding:'hex',token});
    if(Validate)return res.status(200).send('validation complete');
    return res.status(401).send('incorret code');
    } catch (error) {
      return res.status(500).send("failed");
    }
    
  })

  app.get('/*',(req,res)=>{
    return res.status(200).send('SERVER IS UP');
  })

app.listen(Port,()=>{
    console.log(`server running on port ${Port}`);
});

