const express = require('express');
const router = express.Router();
const People = require('../models/people');
const Food = require("../models/food");
const Users = require('../models/users');

router.get("/", async(req, res)=>{
    
    try{
        const users = await Users.find();
        let arrayToSend = []
        await users.forEach((element)=>{
            arrayToSend = [
                ...arrayToSend,
                {_id: element._id,
                name: element.username,
                thanks: element.thanks,
                foods: element.likedFood}]
        })
        const everyone = await People.find();
        res.json({
            'data': everyone,
            'allUsers': arrayToSend
            
        })
    }
    catch(err){
        console.log(err)
        res.json({
            'data': "err"
        })
    }
})

router.get("/test", async(req,res) => {
  try{
    
  }
  catch(err){
      console.log(err)
  }
})

router.post("/invite", async(req,res)=>{
    try{
        
        const newPerson = await People.create({
            name: req.body.name,
            foodBrought: []
        })
 
        if(req.body.foodBrought.length > 0){
          await req.body.foodBrought.forEach(async(element) => {
            let food = await Food.findOne({name: element});
            const person = await People.findByIdAndUpdate(newPerson._id, {$push: {foodBrought: food}},{'new': true})

          });
          res.json({
            'status':200,
            'data': `invited ${req.body.name}`
        })
        }
        else{
            res.json({
            'status':400,
            'data': `invited ${newPerson.name}`
        })
        }

    }
    catch(err){
       console.log(err)
        res.json({
            'status':400,
            'data':"error"
        })
    }
})

module.exports = router;