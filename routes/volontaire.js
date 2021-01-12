const express = require('express');
const router = express.Router();
const passport = require('passport');
const Volontaire = require('../models/volontaire');
const multer = require('multer');

 //Add New entreprise  passport.authenticate('jwt', { session : false}), multer.single("image"), 
    router.post('/add', (req, res, next) => {
      console.log(req.body);
      const url = req.protocol + '://' + req.get('host');
      console.log(req.file.filename);
    let volontaire = new Volontaire({
        IdUser:req.body.IdUser,
        telephon:req.body.telephon,
        Adresse:req.body.Adresse,
      //  image:req.body.image 
        image: url+ '/images/' + req.file.filename
    });

    
    volontaire.save((err, volontaireRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        volontaires: volontaireRes,
        message: 'volontaire Saved'
      });

    });
   // return res.send('add entreprise');
});



//Login
router.post('/auth', (req, res, next) => {
  const IdUser = req.body.IdUser; 
  const query =  {IdUser}
  //Check the user exists
  Volontaire.findOne(query, (err, volontaireR) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }
    console.log(volontaireR)
    //No User match the search condition
    if (!volontaireR) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      console.log(volontaireR)
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          volontaires: volontaireR,
        });
    }
    });
    

});


router.post('/update',(req, res, next) => {
  console.log(req.body);
  const volontaireR =({
    IdUser:req.body.IdUser,
    telephon:req.body.telephon,
    Adresse:req.body.Adresse,
    image:req.body.image     
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
   console.log(query)
   Volontaire.update(query,volontaireR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!volontaireR){
      return res.send({
        success: false,
        message: "!volontaire",
      });
      
    }
    return res.send({
      success: true,
      message: "!volontaire is updated",
      volontaire:volontaireR
    });
    console.log("volontaire is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  Volontaire.find((err, volontaires)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      volontaires
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  Volontaire.findOne(query, (err, volontaire) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!volontaire) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          volontaire: volontaire,
        });
    }
    });
  });

  module.exports = router;