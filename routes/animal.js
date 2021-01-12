const express = require('express');
const router = express.Router();
const passport = require('passport');
const Animal = require('../models/animal');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
     // console.log(req.body);

    let animal = new Animal({
        IdUser:req.body.IdUser,
      Type:req.body.Type,
      Name:req.body.Name,
      Race:req.body.Race,
      Image:req.body.Image
    });

    
    animal.save((err, animalRes) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }

      return res.send({
        success: true,
        Animal : animalRes,
        message: 'animal Saved'
      });

    });
   // return res.send('add animal');
});





router.post('/update',(req, res, next) => {
  console.log(req.body);
  const animalR =({
    id :req.body.id,
    IdUser:req.body.IdUser,
    Type:req.body.Type,
    Name:req.body.Name,
    Race:req.body.Race,
    Image:req.body.Image

  });
   const  IdUser=req.body.IdUser;
  const query ={ id }
   console.log(query)
   Animal.update(query,animalR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!animalR){
      return res.send({
        success: false,
        message: "!animal",
      });
      
    }
    return res.send({
      success: true,
      message: "!animal is updated",
      Animal : animalR
    });
    console.log("animal is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  Animal.find((err, animal)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the user'
      });
    }
   // console.log(animal)
    return res.send({
      success: true,
      Animal: animal
    });
  });
});


router.post('/get', (req, res, next) => {
 // console.log(req)
  const IdUser = req.body._id;
  const query = { IdUser }
  console.log(query)
  //Check the user exists
  Animal.find(query, (err, animal) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!animal) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
     // console.log(animal)
        //Send the response back
        return res.send({
          success: true,
        message: 'success',
        Animal : animal
        });
    }
    });
  });



  router.post('/delete', (req, res, next) => {
   // console.log(req)
    let _id  = req.body._id;
    let query = {_id}
    console.log(query)
    //Check the user exists
    Animal.findByIdAndRemove(query, (err, animal) => {
      //Error during exuting the query
      if (err) {
        return res.send({
          success: false,
          message: 'Error, please try again'+query._id 
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


    router.post('/getById', (req, res, next) => {
      // console.log(req)
       const _id = req.body._id;
       const query = { _id }
       console.log(query)
       //Check the user exists
       Animal.findById(query, (err, animal) => {
         //Error during exuting the query
         if (err) {
           return res.send({
             success: false,
             message: 'Error, please try again'+query
           });
         }
     
         //No User match the search condition
         if (!animal) {
           return res.send({
             success: false,
             message: 'Error, Account not found '+query.IdUser
           });
         }else{
          // console.log(animal)
             //Send the response back
             return res.send({
               success: true,
             message: 'success',
             Animal : animal
             });
         }
         });
       });





  module.exports = router;