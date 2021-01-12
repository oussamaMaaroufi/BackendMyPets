const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer =require('../multerConfig');
const Veterinaire = require('../models/veterinaire');


 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body);
      const url = req.protocol + '://' + req.get('host');
      console.log(url);
       console.log(req.file);
    let veterinaire = new Veterinaire({
        IdUser:req.body.IdUser, 
        name:req.body.name,
        telephon:req.body.telephon,
        Adresse:req.body.Adresse,
     //   image:url+ '/images/' + req.file.filename
    });

    
    veterinaire.save((err, veterinaireRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        veterinaires:veterinaireRes,
        message: 'veterinaire Saved'
      });

    });
   // return res.send('add entreprise');
});



//Login
router.post('/auth', (req, res, next) => {
  const IdUser = req.body.IdUser;
  const  query =  {IdUser}

  console.log(query)
  //Check the user exists
  Veterinaire.findOne(query, (err, veterinaire) => {
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
        message: 'Error, Account not found '+IdUser
      });
    }else{
      console.log(veterinaire)
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          veterinaires: veterinaire,
        });
    }
    });
    

});


router.post('/update',(req, res, next) => {
  console.log(req.body);
  const veterinaireR =({
    IdUser:req.body.IdUser,
        telephon:req.body.telephon,
        Adresse:req.body.Adresse,
        image:req.body.image    
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
   console.log(query)
   Veterinaire.update(query,veterinaireR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!veterinaireR){
      return res.send({
        success: false,
        message: "!veterinaire",
      });
      
    }
    return res.send({
      success: true,
      message: "!veterinaire is updated",
     veterinaires: veterinaireR
    });
    console.log("veterinaire is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  Veterinaire.find((err, veterinaires)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      veterinaires
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  Veterinaire.findOne(query, (err, veterinaire) => {
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
          veterinaires: veterinaire,
        });
    }
    });
  });
  module.exports = router;