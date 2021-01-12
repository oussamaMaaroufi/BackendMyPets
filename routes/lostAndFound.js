const express = require('express');
const router = express.Router();
const passport = require('passport');
const LostAndFound = require('../models/lostAndFound');

 //Add New entreprise  passport.authenticate('jwt', { session : false}),
    router.post('/add',  (req, res, next) => {
      console.log(req.body)
    let lostAndFounds = new LostAndFound({
        IdUser:req.body.IdUser,
        Desc: req.body.Desc,
        UserName:req.body.UserName,
        Type:req.body.Type,
        Image:req.body.Image,
     //   Date:new Date(),
        valide:false
    
    });

    //console.log(lostAndFounds);
    lostAndFounds.save((err, LostAndFound) => {  
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, pelase try again'
        });
      }
      console.log(LostAndFound)
      return res.send({
        success: true,
        LostAndFound:LostAndFound,
        message: 'lostAndFound Saved'
      });

    });
   // return res.send('add lostAndFound');
});





router.post('/update',(req, res, next) => {
 // console.log(req.body);
  const lostAndFoundR =({
        IdUser:req.body.IdUser,
        Desc: req.body.Desc,
        Type:Strireq.body.Type,
        Date:req.body.Date,
        valide:req.body.valide
  });
   const  IdUser=req.body.IdUser;
  const query ={ IdUser }
  // console.log(query)
   LostAndFound.update(query,lostAndFoundR,err => {
    if (err){
      return res.send({
        success: false,
        message: err,
      });
    }
    if(!lostAndFoundR){
      return res.send({
        success: false,
        message: "!lostAndFound",
      });
      
    }
    return res.send({
      success: true,
      message: "!lostAndFound is updated",
      lostAndFound :lostAndFoundR
    });
    console.log("lostAndFound is updated"+res);
  });
});

//  passport.authenticate('jwt', { session : false}),
router.post('/list', (req, res, next) => {
  //const owner = req.body.owner;
  LostAndFound.find((err, lostAndFounds)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while reteriving the list'
      });
    }

    return res.send({
      success: true,
      lostAndFounds:lostAndFounds
    });
  });
});


router.post('/get', (req, res, next) => {
  const _id = req.body.id;
  const query = { _id }
  console.log(query)
  //Check the user exists
  LostAndFound.findOne(query, (err, lostAndFound) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'+query
      });
    }

    //No User match the search condition
    if (!lostAndFound) {
      return res.send({
        success: false,
        message: 'Error, Account not found '+query.IdUser
      });
    }else{
      
        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          lostAndFound: lostAndFound,
        });
    }
    });
  });


  router.post('/getLost', (req, res, next) => {
    const query = {Type : "Lost"}
    //console.log(query)
    //Check the user exists
    LostAndFound.find(query, (err, lostAndFound) => {
      //Error during exuting the query
      if (err) {
        return res.send({
          success: false,
          message: 'Error, please try again'+query
        });
      }
  
      //No User match the search condition
      if (!lostAndFound) {
        return res.send({
          success: false,
          message: 'Error, Lost is found '+query.Type
        });
      }else{
        
          //Send the response back
          return res.send({
            success: true,
            lostAndFound:lostAndFound
          });
      }
      });
    });

    router.post('/getFound', (req, res, next) => {
      const query = { Type : "Found" }
    //  console.log(query)
      //Check the user exists
      LostAndFound.find(query, (err, lostAndFound) => {
        //Error during exuting the query
        if (err) {
          return res.send({
            success: false,
            message: 'Error, please try again'+query
          });
        }
    
        //No User match the search condition
        if (!lostAndFound) {
          return res.send({
            success: false,
            message: 'Error, Found not found '
          });
        }else{
          
            //Send the response back
            return res.send({
              success: true,
              message: ' Found is found '+query.Type,
              lostAndFound :lostAndFound
            });
        }
        });
      });

  module.exports = router;