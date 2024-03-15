const express = require('express');
// import zod from 'zod';
// import {Account} from '../db';
const {Account} = require("../db");
const mongoose = require('mongoose');

// const jwt = require(jsonwentoken);
// import { authMiddleware } from '../middleware';
const { authMiddleware} = require('../middleware');
// import JWT_SECRET from '../config';


const router = express.Router();


// const signupBody = zod.object({
//     userId : zod.string(),
//     Balance : zod.number(),
// })


// 

router.get('/balance',authMiddleware, async (req, res) => {

    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance,
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    const {to , amount} = req.body;

    if(to === req.userId){
        await session.abortTransaction();
        return res.json({
            message:"Cannot Transfer to Yourself"
        });
    }
    const account = await Account.findOne({
        userId : req.userId,
    }).session(session);

    if(!account || account.balance < amount) {

        await session.abortTransaction();
      return  res.status(400).json({
            message: 'Insufficient balance'
        })
    }

    const toAccount = await Account.findOne({userId : to}).session(session);

    if(!toAccount) {
        await session.abortTransaction();
        res.status(400).json({
            message: 'Invalid account'
        })
    }

    // perform the transation

    await Account.updateOne({userId : req.userId}, { $inc : {balance : -amount}}).session(session);
    await Account.updateOne({userId : to}, {$inc : {balance : amount}}).session(session);

    await session.commitTransaction();

    res.json({
        message : ' Transfered succesfully'
    })
})


module.exports = router;