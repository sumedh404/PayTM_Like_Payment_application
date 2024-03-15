
const express = require('express');
// import zod from "zod";
const zod = require('zod');
// import {User} from "../db";
const {User,Account} = require('../db');
const jwt = require('jsonwebtoken');
// import JWT_SECRET from "../config"
const { JWT_SECRET } = require('../config')
// const JWT_SECRET = "mynameissumedh";
const router = express.Router();
const {authMiddleware} = require('../middleware');

const signupBody = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

router.post('/signup', async (req, res)=>{

    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs  123"
        })
    }


    const exitsUser = await User.findOne({
        username : req.body.username
    })

    if(exitsUser){
        return res.status(411).json({message: " Username already taken / incorrect inputs 456"})
    }

    // const user = await User.create(body);
    // this and ^ this are same 
    //          |
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })  
                    
    const userId = user._id;

    // create account

    await Account.create({
        userId,
        balance: 1 + Math.random()* 100000
    })

    const token = jwt.sign({
        userId 
    },JWT_SECRET)

    res.status(200).json({
        message: "User created successfully",
        token :token
    
    })

})


const schemaSignin = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post('/signin', async function(req, res){

    // const username = req.header.username;
    // const password = req.header.password;

    // const headers = req.header;
    const {success} = schemaSignin.safeParse(req.body)

    if(!success) {
        return res.status(401).json({
            message: 'invalid username or password'
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password : req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId : user._id,
        },JWT_SECRET)

        res.json({
            token : token
        })
        return;
    }


    res.status(411).json({
        message :"Error while logging in"
    })


})


const updateBody = zod.object({
    
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})


router.put('/',authMiddleware, async (req,res)=>{

    const {success} = updateBody.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message: 'Error while updating information'
        })
    }

    await User.updateOne({
        _id:req.userId
    },req.body)


    res.json({
        message: 'Updated information successfully'
    })

})


router.get('/bulk', async (req, res)=> {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter
            }
        }, {
            lastName: {
                $regex: filter
            }
        }]
    })

    res.json({
        user: users.map((user)=> ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        }))
    })
})


// const userDataBody = zod.object({
//     username : zod.string().email(),
//     password : zod.string(),
//     firstName : zod.string(),
//     lastName : zod.string()
// })
// router.get('/userdata', authMiddleware, (req, res) => {

//     const {success} = userDataBody.safeParse(req.body);

//     if(!success){
//         return res.status(411).json({
//             message: 'Error while updating information'
//         })
//     }

//      res.json({
//         firstName
//     })
        
// })



router.get("/getUser", authMiddleware, async (req, res) => {
    const user = await User.findOne({
      _id: req.userId,
    });
    res.json(user);
  });
module.exports = router;