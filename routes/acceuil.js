const express = require('express');
const router = express.Router();
const passport = require('passport');
const Acceuil = require('../models/Acceuil');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body);
    let acceuil = new Acceuil({
        IdUser:req.body.IdUser,
        IdAnimal:req.body.IdAnimal,
        Description:req.body.Description,
        valide:req.body.valide
    });

    
    acceuil.save((err, acceuilRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        acceuilRes,
        message: 'acceuil Saved'
      });

    });
   // return res.send('add entreprise');
});





router.post('/update',(req, res, next) => {
  console.log(req.body);
  const acceuilR =({
    IdUser:req.body.IdUser,
    IdAnimal:req.body.IdAnimal,
    Description:req.body.Description,
    valide:req.body.valide   
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
   console.log(query)
   Acceuil.update(query,acceuilR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!acceuilR){
      return res.send({
        success: false,
        message: "!acceuil",
      });
      
    }
    return res.send({
      success: true,
      message: "!acceuil is updated",
      acceuilR
    });
    console.log("acceuil is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  Acceuil.find((err, acceuils)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      acceuils
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  Acceuil.findOne(query, (err, acceuil) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!acceuil) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          acceuil: acceuil,
        });
    }
    });
  });
  module.exports = router;