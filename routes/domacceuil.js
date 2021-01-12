const express = require('express');
const router = express.Router();
const passport = require('passport');
const DomAcceuil = require('../models/domAcceuil');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body);
    let domAcceuil = new DomAcceuil({
        IdUser:req.body.IdUser,
        IdAcceuil:req.body.IdAcceuil,
        valide:req.body.valide
    });

    
    domAcceuil.save((err, domAcceuilRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        domAcceuilRes,
        message: 'domAcceuil Saved'
      });

    });
   // return res.send('add domAcceuil');
});





router.post('/update',(req, res, next) => {
  console.log(req.body);
  const domAcceuilR =({
    IdUser:req.body.IdUser,
    IdAcceuil:req.body.IdAcceuil,
    valide:req.body.valide 
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
   console.log(query)
   DomAcceuil.update(query,domAcceuilR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!domAcceuilR){
      return res.send({
        success: false,
        message: "!domAcceuil",
      });
      
    }
    return res.send({
      success: true,
      message: "!domAcceuil is updated",
      domAcceuilR
    });
    console.log("domAcceuil is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  DomAcceuil.find((err, domAcceuils)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      domAcceuils
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  DomAcceuil.findOne(query, (err, domAcceuil) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!domAcceuil) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          domAcceuil: domAcceuil,
        });
    }
    });
  });
  module.exports = router;