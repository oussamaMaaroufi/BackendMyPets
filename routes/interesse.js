const express = require('express');
const router = express.Router();
const passport = require('passport');
const Interesse = require('../models/interesse');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body);
    let interesse = new Interesse({
        IdUser:req.body.IdUser,
        Idaccouplement:req.body.Idaccouplement
    });

    
    interesse.save((err, interesseRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        interesseRes,
        message: 'interesse Saved'
      });

    });
   // return res.send('add interesse');
});





router.post('/update',(req, res, next) => {
  console.log(req.body);
  const interesseR =({
    IdUser:req.body.IdUser,
    Idaccouplement:req.body.Idaccouplement
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
   console.log(query)
   Interesse.update(query,interesseR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!interesseR){
      return res.send({
        success: false,
        message: "!interesse",
      });
      
    }
    return res.send({
      success: true,
      message: "!interesse is updated",
      interesseR
    });
    console.log("interesse is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  Interesse.find((err, interesses)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      interesses
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  Interesse.findOne(query, (err, interesse) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!interesse) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          interesse: interesse,
        });
    }
    });
  });

  module.exports = router;