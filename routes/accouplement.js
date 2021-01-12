const express = require('express');
const router = express.Router();
const passport = require('passport');
const Accouplement = require('../models/accouplement');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body);
    let accouplement = new Accouplement({
        IdAnimal:req.body.IdAnimal,
         Description:req.body.Description,
         Data:req.body.Data,
         valide:req.body.valide
    });

    
    accouplement.save((err, accouplementRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        accouplementRes,
        message: 'accouplement Saved'
      });

    });
   // return res.send('add entreprise');
});





router.post('/update',(req, res, next) => {
  console.log(req.body);
  const accouplementR =({
    IdAnimal:req.body.IdAnimal,
         Description:req.body.Description,
         Data:req.body.Data,
         valide:req.body.valide  
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
   console.log(query)
   Accouplement.update(query,accouplementR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!accouplementR){
      return res.send({
        success: false,
        message: "!accouplement",
      });
      
    }
    return res.send({
      success: true,
      message: "!accouplement is updated",
      accouplementR
    });
    console.log("accouplement is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  Accouplement.find((err, accouplements)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      accouplements
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  Accouplement.findOne(query, (err, accouplement) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!accouplement) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          accouplement: accouplement,
        });
    }
    });
  });
  module.exports = router;