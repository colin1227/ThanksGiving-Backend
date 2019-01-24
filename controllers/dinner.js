const express = require('express');
const router = express.Router();
const Food = require("../models/food");

router.get('/', async(req, res)=>{
    try{
    const food = await Food.find({});
    res.json({
        'data': food
    })
    }
    catch(err){
        console.log("no food")
        res.json({
            'data': 'error pulling food'
        })
    }
})

router.post("/insert", async(req, res)=>{
    if(req.body.super === true){
        try{
            const newFood = await Food.create({
                name: req.body.name,
                image: req.body.image
            });
            res.json({data: true});
            }
        catch(err){
            res.json({data: "failed"});
            };
        }
    else {
        console.log(req.body.super, "line 124");
    } ;  
});

router.put("/edit", async(req, res)=>{
    console.log(req.body, "line 39")
    if(req.body.super === true){
        try{
            const food2Change = await Food.findOneAndUpdate({name: req.body.originalName},
                {name: req.body.editName,
                image: req.body.editImage}, {'new': true})
            res.json({
                'data':`${food2Change.name} edited`
            })
        }
    
        catch(err){
            console.log(err)
            res.json({
                'data': {err}
            })
        }
    }
})

router.delete("/remove", async(req, res)=>{
    console.log(req.body, "line 57")
    if(req.body.super === true){
        try{
            const food2Delete = await Food.findOneAndDelete({name: req.body.originalName});
            console.log("works", food2Delete)
            res.json({
                "data":"success full deletion"
            })

        }
        catch(err){
            console.log(err)
            res.json({
                'data':`error deleting ${req.body.originalName}`
            })
        }
    }
})

module.exports = router;