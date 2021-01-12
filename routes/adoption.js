const express = require('express');
const router = express.Router();
const passport = require('passport');
const Adoption = require('../models/adoption');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body);
    let adoption = new Adoption({
        IdUser:req.body.IdUser, 
        IdAnimal:req.body.IdAnimal,
        nameAnimal:req.body.nameAnimal,
        image:req.body.image,
       // Date:req.body.Date,
        Description:req.body.Description,
        valide:req.body.valide
    });
    const IdAnimal = adoption.IdAnimal;
    const query = { IdAnimal}

    console.log(query)

    Adoption.findOne(query, (err, adoptione) => {
      //Error during exuting the query

      console.log(adoptione)
      
  
      //No User match the search condition
      if (!adoptione) {
        adoption.save((err, adoptionRes) => {  
          if (err) {
            // throw err;
            return res.send({
              success: false,
              message: 'Error while saving, pelase try again',
              adoption : adoptionRes
            });
          }
    
         

        });
      }
      });




    
});





router.post('/update',(req, res, next) => {
  console.log(req.body);
  const adoptionR =({
    IdUser:req.body.IdUser, 
        IdAnimal:req.body.IdAnimal,
        nameAnimal:req.body.nameAnimal,
        image:req.body.image,
        Date:req.body.Date,
        Description:req.body.Description,
        valide:req.body.valide  
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
   console.log(query)
   Adoption.update(query,adoptionR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!adoptionR){
      return res.send({
        success: false,
        message: "!adoption",
      });
      
    }
    return res.send({
      success: true,
      message: "!adoption is updated",
      adoption:adoptionR
    });
    console.log("adoption is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  Adoption.find((err, adoptions)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }

    return res.send({
      success: true,
      adoption:adoptions
    });
  });
});


router.post('/delete', (req, res, next) => {
  // console.log(req)
   let IdAnimal  = req.body._id;
  
   //Check the user exists
   Adoption.findByIdAndUpdate(IdAnimal, (err, animal) => {
     //Error during exuting the query
     if (err) {
       return res.send({
         success: false,
         message: 'Error, please try again'
       });
     }else{
       
         //Send the response back
         return res.send({
           success: true,
           message: 'Delete is success',
           animal
         });
     }
     });
   });



router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  Adoption.findOne(query, (err, adoption) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!adoption) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          adoption: adoption,
        });
    }
    });
  });
  module.exports = router;