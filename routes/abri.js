const express = require('express');
const router = express.Router();
const passport = require('passport');
const Abri = require('../models/abri');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body);
    let abri = new Abri({
        IdUser:req.body.IdUser,
        name:req.body.name,
        telephon:req.body.telephon,
        Adresse:req.body.Adresse,
        image:req.body.image 
    });

    
    abri.save((err, abriRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        abris:abriRes,
        message: 'abri Saved'
      });

    });
   // return res.send('add entreprise');
});



//Login
router.post('/auth', (req, res, next) => {
  const IdUser = req.body.IdUser;
  console.log(req.body)
  const query =  {IdUser}
  //Check the user exists
  Abri.findOne(query, (err, abri) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!abri) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          abris: abri,
        });
    }
    });
    

});


router.post('/update',(req, res, next) => {
  console.log(req.body);
  const abriR =({
    IdUser:req.body.IdUser,
        telephon:req.body.telephon,
        Adresse:req.body.Adresse,
        image:req.body.image    
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
   console.log(query)
   Abri.update(query,abriR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!abriR){
      return res.send({
        success: false,
        message: "!abri",
      });
      
    }
    return res.send({
      success: true,
      message: "!abri is updated",
      abriR
    });
    console.log("abri is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  Abri.find((err, abri)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      abris: abri
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body._id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  Abri.findOne(query, (err, abris) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!abris) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          abris: abris,
        });
    }
    });
  });
  module.exports = router;