const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const bank = require('../model/Bank')
const { body, validationResult } = require('express-validator')
const { validateToken } = require("../middleware/auth");
var jwt = require('jsonwebtoken');
router.use(express.json())

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const data = await bank.findOne({ email: email })
        if (!data) {
            return res.status(400).json({ message: "USER NOT REGISTERED" })
        } else {
            bcrypt.compare(password, data.password, async function (err, result) {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                        data: data._id
                    }, process.env.SECRET);

                    return res.status(200).json({ message: "Success", token ,email })
                } else {
                    res.json({ message: "Incorrect Password" })

                }
            });
        }

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})



router.post('/register', body('email').isEmail(), body('password').isLength(min = 6, max = 16), async (req, res) => {
    const { email, password } = req.body
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(500).json({ message: error.array() })
        }
        const data = await bank.findOne({ email: email })
        if (data) {
            return res.status(500).json({
                message: "email is already registered"
            })
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).json({ message: err.message })
            }

            const data = await bank.create({
                email,
                password: hash
            })
            res.status(200).json({
                status: "success",
                message: "Registeration successfull"
            })
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }

})
router.post('/withdraw',validateToken,async(req,res)=>{
    try {
        const amount=req.body.amount
        const data=await bank.findOne({_id:req.bank})   
        if(amount === 0 ){
            res.status(201).json({message:'failed'})
        }
        else if(amount <= data.amount){
            if(amount > 0){
                const result=await Number(data.amount)-Number(amount)
                const ans=await bank.updateOne({_id:req.bank},{amount:result})
                res.status(201).json({
                    message:"successfull"
                })   
            }
            else{
                res.status(501).json({message:'amount must be greater than 0'})
            }
            
        }
       
        else{
            res.status(501).json({message:'Insufficiant balance'})
        }
        
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})
router.post('/deposit',validateToken,async(req,res)=>{
    try {
        const amount=req.body.amount
        if(amount === 0 ){
            res.status(501).json({message:'failed'})
        }
        else{
            const data=await bank.findOne({_id:req.bank})
            const result=await Number(amount)+Number(data.amount)
            const ans= await bank.updateOne({_id:req.bank},{amount:result})
            res.status(201).json({
                message:"successfull"
            })
        }
        
        
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})
router.get('/request',validateToken,async(req,res)=>{
    try {
        const data=await bank.findOne({_id:req.bank})
        res.status(201).json({
            message:"success",
            amount:data.amount})
        
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})
module.exports = router;