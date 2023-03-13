const router = require("express").Router();
const auth = require("../middleware/auth");
const slotModel = require("../app/database/Models/slot.model") 
router.post('/addSlot',async(req,res)=>{
    try{
        console.log(req.body.batch)
        if (req.body.batch){
            slotModel.create(req.body.slot, function(err){
              if(err)
                res.send(err);
          
              else
                res.json(req.body);
            });
          }
          // Single JSON Object
          else {
            var newOrg = new slotModel(req.body);
          
            // New User is saved in the db.
            newOrg.save(function(err){
              if(err)
                res.send(err);
          
              // If no errors are found, it responds with a JSON of the new user
              else
                res.json(req.body);
          })}
await newSlot.save()
res.status(200).send({
    apiStatus:true,
    data:newSlot,
    message:"slot added success"
})
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:null,
    message:"no data founded"
})
    }
})

module.exports = router