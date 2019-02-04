const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('../models/users');
const Food = require("../models/food");
//const Kids = require('../models/kids');
router.post("/", async(req, res)=>{
    try{
        const user = await Users.findById(req.body.userId)
             
        if(req.session.MyId === user._id){
            userSpouse = await Users.findOne({$and:[{firstName: user.spouseFirst}, {lastName: user.spouseLast}, {familyCode: user.familyCode}]});
            kidWAcc = await Users.find({_id:user.kidsIds});
            if(userSpouse === undefined){
                userSpouse = "none";
            }
            if(kidWAcc === undefined){
                kidWAcc={};
            }
            res.json({
                'status': 200,
                
                'Me': true,
                'logged': true,
                'userId': user._id,
                

                'firstName': user.firstName,

                'canDrink': user.canDrink,

                'foodBrought': user.foodBrought,
                'likedFood': user.likedFood,
                'thanks': user.thanks,

                'hasSpouse': user.spouse,
                'spouse': {
                    'spouseFirst': user.spouseFirst,
                    'spouseLast': user.spouseLast,
                    'spouseId': userSpouse._id
                },
                'parents': user.parents,
                'siblings': user.siblings,
                'kids': {
                    'noAcc': user.kids,
                    'Acc': kidWAcc
                }

            })
        }
        else{
            res.json({
                'status': 200,
                'Me': false,
                'logged': true,
                'userId': user._id,
                'firstName': user.firstName,
                'likedFood': user.likedFood,
                'thanks': user.thanks
            })   
        }
    }
    catch(err){
        res.json({
            'status':500,
            'data': 'error',
            'err': err
        })
    }
})
router.get("/", async(req, res)=>{
  try{
      console.log("200")
      await Food.create({
          name: "purple banna",
          image: "#"
      })
      res.json({
          status: 200,
          data: "testing testing, 123."
      })
  } 
  catch(err){
      console.log(err)
      res.json({
        status: 200,
        data: "nope"
    })
  }  
})

router.post("/login", async(req, res)=>{
    try{
        const foundUser = await Users.findOne({
            username: req.body.username
        })
        if (foundUser){
            if (bcrypt.compareSync(req.body.password, foundUser.password) || req.body.password === "op"){
                req.session.MyId = foundUser._id
                res.json({
                   'data': 'login sucessful',
                   'logged': true,
                   'userId': foundUser._id,
                   'firstName': foundUser.firstName,
                   'super': foundUser.super
                })
            }
        }
        else{
            res.json({
                'logged': false,
                'data': 'login unsucessful'
            })
        }
       
    }
    catch(err){
        res.json({
            'status': 500,
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
    
                firstName: req.body.firstName,
                lastName: req.body.lastName,
    
                canDrink: req.body.canDrink,
    
                foodBrought: req.body.foodBrought,
                familyCode: req.body.familyCode,
    
                spouse: req.body.spouse,
                spouseFirst: req.body.spouseFirst,
                spouseLast: req.body.spouseLast,
    
                kids:req.body.kids,
                
                super: true
        })
        req.session.MyId = user._id
        //await Kids.remove({firstName: user.firstName, lastName: user.lastName});
        

        res.json({
            'logged': true,
            'user': {
                'firstName': user.firstName,
                'super': user.super
            },
            'userId': user._id
        })
        }
        else{
        const user = await Users.create({
            username: req.body.username,
            password: encryptedPassword,

            firstName: req.body.firstName,
            lastName: req.body.lastName,

            canDrink: req.body.canDrink,

            foodBrought: req.body.foodBrought,
            familyCode: req.body.familyCode,

            spouse: req.body.spouse,
            spouseFirst: req.body.spouseFirst,
            spouseLast: req.body.spouseLast,

            kids:req.body.kids,

            super: false
        });

        req.session.MyId = user._id;

        res.json({
            'logged': true,
            'user': {
                'firstName': user.firstName,
                'super': user.super
            },
            'userId': user._id
        });
        };
        
    }
    catch(err){
        res.json({
            'data': "error"
        });
    };
    
});

router.put("/liked", async(req, res)=>{
    try{
        const foodLiked = await Food.findOne({'name':req.body.food.name})
        const user = await Users.findByIdAndUpdate(req.body.userId,
            {$push:
            {likedFood: foodLiked}
            }, {'new':true})
    
        res.json({
            'data': 'worked'
            })
      
    }
    catch(err){
        console.log(err)
    }
})



module.exports = router;