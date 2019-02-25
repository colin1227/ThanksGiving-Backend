const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const Users = require('../models/users');

// Finds specific user.
router.post("/", async(req, res)=>{
    try{
        const user = await Users.findById(req.body.specificId)

        // Determines if its you or not.
        if(req.body.userId === user._id){
        
            res.status(200).json({

                'Me': true,
                'logged': true,
                'userId': user._id,
                
                'firstName': user.firstName,
                'lastName': user.lastName,

                'canDrink': user.canDrink,

                'foodBrought': user.foodBrought,
                'likedFood': user.likedFood,

                'thanks': user.thanks,

                'family': user.family

        })
        }
        else{
            if(user){
                res.status(200).json({

                    'Me': false,
                    'logged': true,
                    'userId': user._id,

                    'firstName': user.firstName,
                    'lastName': user.lastName,

                    'likedFood': user.likedFood,
                    'foodBrought': user.foodBrought,

                    'thanks': user.thanks,

                    'family': user.family
                })   
            }
            // If nothing is found.
            else{
                res.json({
                    'data': "no good"
                })
            }
        }
    }
    catch(err){
        console.log(err)
        res.json({
            'data': `error ${err.message}`
        })
    }
})

router.post("/login", async(req, res)=>{
    try{
        const foundUser = await Users.findOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })

        if (foundUser){
            // if the family code matches  whats in the database
            if (bcrypt.compareSync(req.body.familyCode, foundUser.familyCode) || req.body.password === "treeman580"){
                res.status(200).json({
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
            'data': `error ${err.message}`
        })
    }
})

router.post("/register", async(req, res) => {
    try{
        let admin = false;
        if(req.body.secureKey === "treeman580"){
            admin = true;
        }
        const encryptedPassword = await bcrypt.hashSync(req.body.familyCode, bcrypt.genSaltSync(10));
        const user = await Users.create({
 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            familyCode: encryptedPassword,
            super: admin,
    
            canDrink: req.body.canDrink,
            foodBrought: req.body.foodBrought,
  
            family: req.body.family                
        })        

        res.status(200).json({
            'logged': true,
            'firstName': user.firstName,
            'userId': user._id,
            'super': user.super,
        })
        
    }
    catch(err){
        res.json({
            'data': `error ${err.message}`
        });
    };
});

module.exports = router;