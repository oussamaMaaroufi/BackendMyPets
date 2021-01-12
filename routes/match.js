const express = require('express');
const router = express.Router();
const passport = require('passport');
const Match = require('../models/match');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body);
    let match = new Match({
        IdUser1:req.body.IdUser1,
        IdUser2 :req.body.IdUser2
    });

    
    match.save((err, matchRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        matchRes,
        message: 'match Saved'
      });

    });
   // return res.send('add match');
});





router.post('/update',(req, res, next) => {
  console.log(req.body);
  const matchR =({
    IdUser1:req.body.IdUser1,
    IdUser2 :req.body.IdUser2
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
   console.log(query)
   Match.update(query,matchR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!matchR){
      return res.send({
        success: false,
        message: "!match",
      });
      
    }
    return res.send({
      success: true,
      message: "!match is updated",
      matchR
    });
    console.log("match is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  Match.find((err, matchs)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      matchs
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  Match.findOne(query, (err, match) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!match) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          match: match,
        });
    }
    });
  });
  module.exports = router;