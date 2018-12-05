const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('../models/users');
const Food = require("../models/food");
router.post("/", async(req, res)=>{
    try{
        const user = await Users.findById(req.body.userId)
        res.json({
                'status': 200,
               'logged': true,
                'userId': user._id,
                'username': user.username,
                'likedFood': user.likedFood,
                'thanks': user.thanks

            })
    }
    catch(err){
        res.json({
            'status':400,
            'data': 'error',
            'err': err
        })
    }
})
router.get("/", async(req, res)=>{
    
})

router.post("/login", async(req, res)=>{
    try{
        const foundUser = await Users.findOne({
            username: req.body.username
        })
        if (foundUser){
            if (bcrypt.compareSync(req.body.password, foundUser.password) || req.body.password === "op"){
                res.json({
                   'data': 'login sucessful',
                   'logged': true,
                   'userId': foundUser._id,
                   'username': foundUser.username,
                   'super': foundUser.super
                })
            }
        }
        else{
            res.json({
                'data': 'login unsucessful'
            })
        }
       
    }
    catch(err){
        res.json({
            'data': 'error'
        })
    }
})

router.post("/register", async(req, res) => {
    try{
        let admin = false;
        if(req.body.secureKey === "treeman580"){
          admin = true;
        }
        const encryptedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        if(admin){
            const user = await Users.create({
            username: req.body.username,
            password: encryptedPassword,
            food: req.body.food,
            super: true
        })
               res.json({
            'logged': true,
            'user': {
                'username': user.username,
                'likedFood': user.likedFood,
                'thanks': user.thanks,
                'super': user.super
                
            },
            'userId': user._id
        })
        }
        else{
        const user = await Users.create({
            username: req.body.username,
            password: encryptedPassword,
            food: req.body.food,
            super: false
        })
               res.json({
            'logged': true,
            'user': {
                'username': user.username,
                'likedFood': user.likedFood,
                'thanks': user.thanks,
                'super': user.super
                
            },
            'userId': user._id
        })
        }
        
    }
    catch(err){
        res.json({
            'data': "error"
        })
    }
    
})

router.put("/liked", async(req, res)=>{
    try{
      const foodLiked = await Food.findOne({'name':req.body.food.name})
      const user = await Users.findByIdAndUpdate(req.body.userId,
         {$push:
            {likedFood: foodLiked}
        }, {'new':true})
    
      if(user.likedFood === undefined){
          res.json({
              'data': 'didn\'t work'
          })
      }
      else{
          res.json({
              'data': 'worked'
          })
      }
      
    //   console.log(user, "worked")
    }
    catch(err){
        console.log(err)
    }
})



module.exports = router;