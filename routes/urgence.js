const express = require('express');
const router = express.Router();
const passport = require('passport');
const Urgence = require('../models/urgence');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body);
    let urgence = new Urgence({
        IdUser:req.body.IdUser,
        Idveto:req.body.Idveto,
        IdAnimal:req.body.IdAnimal,
        Data:req.body.Data,
        valide:req.body.valide
    });

    
    urgence.save((err, urgenceRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        urgenceRes,
        message: 'urgence Saved'
      });

    });
   // return res.send('add urgence');
});




router.post('/update',(req, res, next) => {
  console.log(req.body);
  const urgence =({
    IdUser:req.body.IdUser,
    Idveto:req.body.Idveto,
    IdAnimal:req.body.IdAnimal,
    Data:Strreq.bodying.Data,
    valide:req.body.valide   
  });
   const  IdUser=req.body.Id;
  const query ={ Id }
   console.log(query)
   Urgence.update(query,urgenceR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!urgenceR){
      return res.send({
        success: false,
        message: "!urgence",
      });
      
    }
    return res.send({
      success: true,
      message: "!urgence is updated",
      urgenceR
    });
    console.log("urgence is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  Urgence.find((err, urgences)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the urgence'
      });
    }

    return res.send({
      success: true,
      urgences
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  Urgence.findOne(query, (err, veterinaire) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!veterinaire) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          veterinaire: veterinaire,
        });
    }
    });
  });
  module.exports = router;