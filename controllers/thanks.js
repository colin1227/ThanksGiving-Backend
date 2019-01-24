const express = require('express');
const router = express.Router();
const Thanks = require('../models/thanks');
const Users = require('../models/users');

router.get("/", async(req, res) => {
  try{
    const allThanks = await Thanks.find({});
    res.json({
        'data': allThanks
    })
  }
  catch(err){
      res.json({
          'data': 'internal service error',
          'err': err
      })
  }
});

router.post("/thankful", async(req, res)=>{
      try{
          console.log("happens on line 22 of thanks.js")
          const user = await Users.findByIdAndUpdate(req.body.userId,
            {$push:
            {thanks:req.body.thanks}})
          const thank = await Thanks.create({
              title:req.body.thanks.title,
              body: req.body.thanks.body
          })
        res.json({
            'accepted': true
        })
      }
      catch(err){
        res.json({
            'data': 'internal service error',
            'err': err
        }) 
    }
})
module.exports = router;
