const express = require('express');
const router = express.Router();
const passport = require('passport');
const RendezVous = require('../models/rendezVous');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body);
    let rendezVous = new RendezVous({
        IdVeto:req.body.IdVeto,
        IdVolo:req.body.IdVolo, 
        IdAnimal:req.body.IdAnimal,
        Date:req.body.Date,
        valide:req.body.valide
    });

    
    rendezVous.save((err, rendezVousRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        rendezVousRes,
        message: 'rendezVous Saved'
      });

    });
   // return res.send('add rendezVous');
});





router.post('/update',(req, res, next) => {
  console.log(req.body);
  const rendezVousR =({
    IdVeto:req.body.IdVeto,
        IdVolo:req.body.IdVolo, 
        IdAnimal:req.body.IdAnimal,
        Date:req.body.Date,
        valide:req.body.valide
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
   console.log(query)
   rendezVous.update(query,rendezVousR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!rendezVousR){
      return res.send({
        success: false,
        message: "!rendezVous",
      });
      
    }
    return res.send({
      success: true,
      message: "!rendezVous is updated",
      rendezVousR
    });
    console.log("rendezVous is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  rendezVous.find((err, rendezVouss)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      rendezVouss
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  rendezVous.findOne(query, (err, rendezVous) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User rendezVous the search condition
    if (!rendezVous) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          rendezVous: rendezVous,
        });
    }
    });
  });
  module.exports = router;